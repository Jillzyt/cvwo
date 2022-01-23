class UsersController < ApplicationController
    before_action :authorized, only: [:auto_login]
  
    # REGISTER
    def create
      @user = User.create(user_params)
      if @user.valid?
        token = encode_token({user_id: @user.id})
        render json: {user: @user, token: token}
      else
        render json: {error: @user.errors[:email] ? @user.errors[:email] : "Invalid email or password"} , status: 400
      end
    end
  
    # LOGGING IN
    def login
      @user = User.find_by(email: params[:email])
  
      if @user && @user.authenticate(params[:password])
        token = encode_token({user_id: @user.id})
        render json: {user: @user, token: token}
      else
        render json: {error: "Invalid email or password"}, status: 400
      end
    end
  
    # LOGGING OUT
    def logout
        render json: {message: "Log out sucessful"}, status: 200
    end
  
  
    # CHECK CREDENTIALS
    def check_credentials
    @user = User.find_by(email: params[:email])

      if @user && @user.authenticate(params[:password])
        token = encode_token({user_id: @user.id})
        render json: {user: @user, token: token}
      else
        render json: {error: "Not logged in"}, status: 400
      end
    end
    
    def auto_login
      render json: @user
    end
  
    private
  
    def user_params
      params.permit(:email, :password, :age)
    end
  
end