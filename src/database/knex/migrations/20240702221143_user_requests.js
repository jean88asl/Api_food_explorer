exports.up = knex => knex.schema.createTable("user_requests", table => {
    table.increments("id")
    table.text("payment_type").nullable()
    table.integer("total_requests").notNullable()
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE")
    table.enum("status", ["pendente", "preparando", "entregue"], {useNative: true, enumName: "status"})
        .notNullable().default("pendente")

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
})

exports.down = knex => knex.schema.dropTable("user_requests")