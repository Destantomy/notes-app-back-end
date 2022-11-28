const { nanoid } = require('nanoid');
const notes = require('./notes.js');

//handler u/ simpan notes
const addNotehandler = (request, h) => {
    const { title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date();//.toISOString;
    const updatedAt = createdAt;

    const newNote = { title, tags, body, createdAt, updatedAt, id }

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id); //.length > 0;

    if(isSuccess){
        const response = h.response({
            status: 'Sukses',
            message: 'Data berhasil ditambahkan',
            data: {
                noteId : id
            }
        });
        response.code(201);
        return response;
    }

        const response = h.response({
            status: 'Gagal',
            message: 'Data gagal ditambahkan'
    });
    response.code(500);
    return response;
}

//handler u/ menampilkan notes
const getAllNotesHandler = () => ({
    status: 'Sukses',
    data: {
        notes
    }
});

//handler u/ detail notes
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if( note !== undefined ) {
        return {
            status: 'Sukses',
            data: {
                note
            }
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;
}

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };
        const response = h.response({
            status: 'Berhasil',
            message: 'Data berhasil diubah'
        });
        response.code(200);
        return response;
    };
    const response = h.response({
        status: 'Gagal',
        message: 'Data gagal dirubah'
    });
    response.code(404);
    return response
}

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'Berhasil',
            message: 'Berhasil menghapus data'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'Gagal',
        message: 'Gagal menghapus data'
    });
    response.code(404);
    return response;
}

module.exports = { addNotehandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };