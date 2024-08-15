exports.up = knex => knex.schema.createTable("request_items", table => {
    table.increments("id")
    table.integer("dish_id").references("id").inTable("dish").notNullable()
    table.integer("id_user").references("id").inTable("users").notNullable()
    table.text("dish_name")
    table.integer("quantity")
    table.integer("request_id").references("id").inTable("user_requests").notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
})

exports.down = knex => knex.schema.dropTable("request_items")