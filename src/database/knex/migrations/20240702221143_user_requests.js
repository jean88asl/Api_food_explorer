exports.up = knex => knex.schema.createTable("user_requests", table => {
    table.increments("id")
    table.text("list_of_dish")
    table.integer("total")
    table.text("type_of_payment")
    table.integer("user_id").references("id").inTable("user").onDelete("CASCADE")

    table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("user_requests")