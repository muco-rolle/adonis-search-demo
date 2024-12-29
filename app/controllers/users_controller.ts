import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
  async index({ inertia, request }: HttpContext) {
    const searchValue = request.input('search')
    let users: Array<User> = []

    if (searchValue) {
      users = await User.query()
        .whereLike('email', `%${searchValue}%`)
        .orWhereLike('fullName', `%${searchValue}%`)
    } else {
      users = await User.all()
    }

    return inertia.render('home', { users })
  }
}
