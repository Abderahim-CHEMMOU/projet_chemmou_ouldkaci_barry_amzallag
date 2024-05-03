import mongoose from "mongoose";

export default class Event {
    _id: String;
    last_name: String;
    first_name: String;
    age: Number;
    email: String;
    password: String;
    created_at:  Date;


    constructor(
        _id: String,
        last_name: String,
        first_name: String,
        age: Number,
        email: String,
        password: String,
        created_at:  Date,
    ) {
        this._id= _id;
        this.last_name= last_name;
        this.first_name= first_name;
        this.age= age;
        this.email=  email;
        this.password= password;
        this.created_at= created_at;
    }
}
