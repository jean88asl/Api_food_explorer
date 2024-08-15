exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id")
    table.text("name").notNullable()
    table.integer("dish_id").references("id").inTable("dish").onDelete("CASCADE")

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
})

exports.down = knex => knex.schema.dropTable("ingredients")