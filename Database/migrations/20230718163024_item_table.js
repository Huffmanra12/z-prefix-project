/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments()
    table.integer('userid');
    table.foreign('userid').references('users.id');
    table.string('item_name');
    table.string('description', 3000);
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('userid');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('item')
  })
};
