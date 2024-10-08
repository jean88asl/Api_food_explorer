exports.up = knex => knex.schema.createTable("likes", table => {
    table.increments('id')

    table.integer('dish_id').references("id").inTable("dish").onDelete("CASCADE").notNullable();
    table.integer("user_id").references("id").inTable("users").notNullable();

    table.boolean('liked').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()

    table.unique(['dish_id', 'user_id']);
})

exports.down = knex => knex.schema.dropTable("likes")
