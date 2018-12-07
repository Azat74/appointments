class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def new?
    create?
  end

  def create?
    @user.is_admin
  end

  def update?
    @user.is_admin
  end

  def edit?
    update?
  end
end
