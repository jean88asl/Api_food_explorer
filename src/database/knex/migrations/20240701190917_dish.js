exports.up = knex => knex.schema.createTable("dish", table => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("category").notNullable()
    table.integer("price").notNullable()
    table.text("description").notNullable()
    table.text("image_dish")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("dish")