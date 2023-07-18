const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {First_Name: 'John', Last_Name: 'Nolan', Username: 'JNolan', Password: bcrypt.hashSync('ZPrefixEncryptedPassword', 10)},
    {First_Name: 'Chuck', Last_Name: 'Norris', Username: 'CNorris', Password: bcrypt.hashSync('TheWayOfTheDragon', 10)}
  ]);
};
