import mongoose from "mongoose";

const Database = mongoose;
const Schema = mongoose.Schema;
const Model = mongoose.model;
const Connection = mongoose.connection;

export { Database, Schema, Model, Connection, mongoose };
