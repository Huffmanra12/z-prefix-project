/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments()
    table.integer('UserId');
    table.foreign('UserId').references('users.id');
    table.string('Item_Name');
    table.string('Description', 3000);
    table.integer('Quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('UserId');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('item')
  })
};
