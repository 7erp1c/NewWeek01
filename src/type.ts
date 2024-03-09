import {Request} from "express";

export type RequestWithPost<T> = Request<{},{},T>

export type RequestWithPut<T,B> = Request<T,{},B>
