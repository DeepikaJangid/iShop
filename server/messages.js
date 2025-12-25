const messages = {
    catch_error: {
        msg: "Something went wrong in the server.",
        flag: 0 //flase
    },
    created: {
        msg: "Data created successfully!",
        flag: 1 //true
    },
    name_already_exists: {
        msg: "Data with the same name already exists.",
        flag: 0
    },
    data_doesnot_exist: {
        msg: "Data does not exist.",
        flag: 0
    },
    image_upload_unsuccessful: {
        msg: "Uploading Image went Unsuccessful.",
        flag: 0
    },
    image_upload_successful: {
        msg: "Image Uploaded Successfully.",
        flag: 1
    },
    data_deleted: {
        msg: "Data Deleted Successfully.",
        flag: 1
    },
    data_updated: {
        msg: "Data Updated Successfully.",
        flag: 1
    }

}

module.exports = messages;