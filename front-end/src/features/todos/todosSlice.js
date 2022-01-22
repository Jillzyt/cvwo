import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { StatusFilters } from "../filters/filtersSlice";

const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: "idle",
});

// Thunk functions
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await client.get("http://localhost:4000/todos");
  return response;
});

export const saveNewTodo = createAsyncThunk(
  "todos/saveNewTodo",
  async (object) => {
    const initialTodo = {
      description: object.text,
      status: "false",
      tag_list: object.tag_list,
    };
    const response = await client.post(
      "http://localhost:4000/todos",
      initialTodo
    );
    return response;
  }
);

export const completeTodo = createAsyncThunk("todos/complete", async (id) => {
  const response = await client.post(
    "http://localhost:4000/todos/complete/" + id,
    {}
  );
  return response;
});

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  const response = await client.delete("http://localhost:4000/todos/" + id);
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoToggled(state, action) {
      const todoId = action.payload;
      const todo = state.entities[todoId];
      todo.status = !todo.status;
    },
    todoTagSelected: {
      reducer(state, action) {
        const { tag, todoId } = action.payload;
        state.entities[todoId].tag = tag;
      },
      prepare(todoId, tag) {
        return {
          payload: { todoId, tag },
        };
      },
    },
    clearTodo(state, action) {
      state.entities = null;
      state.ids = null;
    },
    todoDeleted: todosAdapter.removeOne,
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true;
      });
    },
    completedTodosCleared(state, action) {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
      todosAdapter.removeMany(state, completedIds);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
      .addCase(completeTodo.fulfilled, (state, action) => {
        todosAdapter.setOne(state, action.payload);
        state.status = "idle";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload);
        state.status = "idle";
      });
  },
});

export const {
  allTodosCompleted,
  completedTodosCleared,
  todoAdded,
  todoTagSelected,
  todoDeleted,
  todoToggled,
  clearTodo,
} = todosSlice.actions;

export default todosSlice.reducer;

export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTodos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
);

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, tags } = filters;
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions && tags.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.status === completedStatus;
      const tagMatches =
        tags.length === 0 || tags.every((ai) => todo.tag_list.includes(ai));
      return statusMatches && tagMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);
