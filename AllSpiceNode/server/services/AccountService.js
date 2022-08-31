import { dbContext } from '../db/DbContext'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  async editAccount(body, userInfo) {
    let original = await this.getAccount(userInfo)
    original.name = body.name || original.name
    original.picture = body.picture || original.picture
    await original.update()
  }

  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }



  // NOTE good example of nested populate here
  async getFavorites(id) {
    let favorites = await dbContext.Favorite.find({ accountId: id })
      .populate({
        path: 'recipe',
        populate: {
          path: 'creator'
        }
      })
    return favorites
  }


  async getUserRecipes(id) {
    let recipes = await dbContext.Recipe.find({ creatorId: id })
      .populate('creator')
    return recipes
  }




  async getOtherUserAccount(id) {
    let account = await dbContext.Account.findById(id)
    return account
  }

  async getOtherUserRecipes(id) {
    let recipes = await dbContext.Recipe.find({ creatorId: id })
    return recipes
  }

  async getOtherUserReviews(id) {
    let reviews = await dbContext.Review.find({ creatorId: id }).populate('creator').populate('recipe')
    return reviews
  }
}
export const accountService = new AccountService()
