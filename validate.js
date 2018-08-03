module.exports = {
    get_or_delete: {
        type: 'object',
        properties: {
            id: {
                type: 'uuid',
                required: true
            }
        }
    },
    userPost: {
        type: 'object',
        properties: {
            username:{
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            } ,
            firstname: {
                type: 'string',
                required: true
            },
            propic: {
                type: 'string'
            }
        }
    },
    userPatch: {
        type: 'object',
        properties: {
            username:{
                type: 'string',
            },
            firstname: {
                type: 'string',

            },
            propic: {
                type: 'string'
            }
        }
    },
    userPostErr: 'usage: username: string, password: string, firstname: string',
    folderPost: {
        type: 'object',
        properties: {
            user_id: {
                type: 'uuid',
                required: true
            },
            name: {
                type: 'string',
                required: true
            }
        }
    },
    folderPatch: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                required: true
            }
        }
    },
    folderList: {
        type: 'object',
        properties: {
            user_id: {
                type: 'uuid',
            },
            offset: {
                type: 'string'
            }
        }
    },
    linkPost: {
        type: 'object',
        properties: {
            user_id: {
                type: 'uuid',
                required: true
            },
            url: {
                type: 'string',
                required: true
            },
            img: {
                type: 'string',
            },
            headline: {
                type: 'string',
                required: true
            }
        }
    },
    linkList: {
        type: 'object',
        properties: {
            user_id: {
                type: 'uuid',
            },
            offset: {
                type: 'string'
            }
        }
    }, 
    link_on_foldersPost: {
        type: 'object',
        properties: {
            link_id: {
                type: 'uuid',
                required: true
            },
            folder_id: {
                type: 'uuid',
                required: true
            }
        }
    },
    link_on_foldersList: {
        type: 'object', 
        properties: {
            folder_id: {
                type: 'uuid'
            },
            link_id: {
                type: 'uuid'
            },
            offset: {
                type: 'string'
            }
        }
    }
}