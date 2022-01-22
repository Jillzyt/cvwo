class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show update destroy complete ]
  before_action :authorized
  before_action :check_authorized, only: %i[ show update destroy complete ]
  # GET /todos
  def index
    @todos = Todo.joins(:tags).where(user_id: @user.id).select("string_agg(tags.name, ',') as tag_list, todos.*").group("todos.id")

    render json: @todos
  end

  # GET /todos
  def all

    render json: "asdfasdfs"
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # POST /todos
  def create
    @todo = Todo.create(todo_params)
    @todo.user_id = @user.id
    if @todo.save
      new_todo = Todo.joins(:tags).where(id: @todo.id).select("string_agg(tags.name, ',') as tag_list, todos.*").group("todos.id")
      render json: new_todo[0], status: :created, location: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/:id
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # POST /todos/complete/:id
  def complete
    new_todo = {
      "status" => true,
      "completed_date" => Date.today
    }
    if @todo.status == true
      new_todo[:status] = false
      new_todo[:completed_date] = nil
    end
    
    @todo.update(new_todo)
    new_todo = Todo.joins(:tags).where(id: @todo.id).select("string_agg(tags.name, ',') as tag_list, todos.*").group("todos.id")

    
    render json: new_todo[0], status: :ok
  end

  # DELETE /todos/:id
  def destroy
    @todo.destroy
  end

  # SEARCH /todos/search
  def search
    @todo = Todo.where(user_id: @user.id)
    names = params[:names]
    new_todos = {}
    names.each do |name|
      new_todos = @todo.tagged_with(name)
      new_todos = @todo && new_todos
    end
    render json: new_todos, status: :ok
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end


    # Validate
    def check_authorized
      if @user.id != @todo.user_id
        render json: "User is not authorized".to_json, status: :forbidden
        return
      end
    end

    # Only allow a list of trusted parameters through.
    # Just raise an error if the key is missing
    def todo_params
      params.require(:todo)
      params.permit(:description, :status, :user_id, :tag_list, :tag_list, :tag, { tag_ids: [] }, :tag_ids)
    end

end
