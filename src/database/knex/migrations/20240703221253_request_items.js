exports.up = knex => knex.schema.createTable("request_items", table => {
    table.increments("id")
    table.text("id_dish")
    table.integer("quantity")
    table.integer("request_id").references("id").inTable("user_requests")

    table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("request_items")