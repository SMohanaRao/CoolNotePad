import { RequestHandler } from "express";
import NoteModel from "../models/notes"
import mongoose from "mongoose";
import createHttpError from "http-errors";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    try {
        const noteId = req.params.noteId
        const note = await NoteModel.findById(noteId).exec()
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

export const createNote: RequestHandler = async (req, res, next) => {
    try {
        const newNote = await NoteModel.create({
            title: req.body.title,
            text: req.body.text,
        });
        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
}

export const updateNote: RequestHandler = async (req, res, next) => {
    try {
        const noteId = req.params.noteId
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }
        const newTitle = req.body.title
        const newText = req.body.text
        const note = await NoteModel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, "Note not found")
        }
        note.title = newTitle
        note.text = newText
        const updateNote = await note.save()
        res.status(200).json(updateNote)
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async(req, res, next) => {
    try {
        const noteId = req.params.noteId
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }
        const note = await NoteModel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, "Note not found")
        }
        await note.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}