const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'John', last_name: 'Nolan', username: 'JNolan', password: bcrypt.hashSync('ZPrefixEncryptedPassword', 10)},
    {first_name: 'Chuck', last_name: 'Norris', username: 'CNorris', password: bcrypt.hashSync('TheWayOfTheDragon', 10)}
  ]);
};
