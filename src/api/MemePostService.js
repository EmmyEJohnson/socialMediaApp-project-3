
import * as tokenService from '../utils/tokenservice';
import tellMemifyto from './tellMemifyto';

//check with J. Flores work to see what he names comment folder/files

import tellMemeifyto from "./tellMemeifyto";

const getAll = () => {
    return tellMemeifyto.get("/memeposts");
};

const get = (id) => {
    return tellMemeifyto.get(`/memeposts/${id}`);
};

const getAllComments = (id) => {
    return tellMemeifyto.get(`/memeposts/${id}/comments`);
}

const create = (data) => {
    return tellMemeifyto.post("/memeposts", data);
};

const createComment = (id, data) => {
    return tellMemeifyto.post(`/memeposts/${id}/comment`, data);
}

const update = (id, data) => {
    return tellMemeifyto.put(`/memeposts/${id}`, data);
};

const updateComment = (id, commentId, data) => {
    return tellMemeifyto.put(`/memeposts/${id}/comment/${commentId}`, data);
}

const remove = (id) => {
    return tellMemeifyto.delete(`/memeposts/${id}`);
};

const removeComment = (id, commentId) => {
    return tellMemeifyto.delete(`/memeposts/${id}/comment/${commentId}`);
}

// You can only export default when there's one thing to export
export { getAll, get, getAllComments, create, createComment, update, updateComment, remove, removeComment };
