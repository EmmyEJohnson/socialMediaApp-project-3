//check with J. Flores work to see what he names comment folder/files

import tellMemeifyto from "./tellMemeifyto";

const getAll = () => {
    return tellMemeifyto.get("/posts");
};

const get = (id) => {
    return tellMemeifyto.get(`/posts/${id}`);
};

const getAllComments = (id) => {
    return tellMemeifyto.get(`/posts/${id}/comments`);
}

const create = (data) => {
    return tellMemeifyto.post("/posts", data);
};

const createComment = (id, data) => {
    return tellMemeifyto.post(`/posts/${id}/comment`, data);
}

const update = (id, data) => {
    return tellMemeifyto.put(`/posts/${id}`, data);
};

const updateComment = (id, commentId, data) => {
    return tellMemeifyto.put(`/posts/${id}/comment/${commentId}`, data);
}

const remove = (id) => {
    return tellMemeifyto.delete(`/posts/${id}`);
};

const removeComment = (id, commentId) => {
    return tellMemeifyto.delete(`/posts/${id}/comment/${commentId}`);
}

// You can only export default when there's one thing to export
export { getAll, get, getAllComments, create, createComment, update, updateComment, remove, removeComment };