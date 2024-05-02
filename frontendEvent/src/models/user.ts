import mongoose from "mongoose";

export default class Event {
    last_name: String;
    first_name: String;
    age: Number;
    email: String;
    password: String;
    created_at:  Date;


    constructor(
        last_name: String,
        first_name: String,
        age: Number,
        email: String,
        password: String,
        created_at:  Date,
    ) {
        this.last_name= last_name;
        this.first_name= first_name;
        this.age= age;
        this.email=  email;
        this.password= password;
        this.created_at= created_at;
    }
}
