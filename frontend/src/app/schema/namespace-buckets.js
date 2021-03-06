/* Copyright (C) 2016 NooBaa */

export default {
    type: 'object',
    additionalProperties: {
        type: 'object',
        required: [
            'name',
            'mode',
            'placement',
            'io'
        ],
        properties: {
            name: {
                type: 'string'
            },
            mode: {
                type: 'string',
                enum: [
                    'OPTIMAL',
                    'NOT_ENOUGH_HEALTHY_RESOURCES',
                    'NO_RESOURCES'
                ]
            },
            placement: {
                type: 'object',
                required: [
                    'readFrom',
                    'writeTo'
                ],
                properties: {
                    readFrom: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    writeTo: {
                        type: 'string'
                    }
                }
            },
            io: {
                type: 'object',
                required: [
                    'readCount',
                    'writeCount',
                    'lastRead',
                    'lastWrite'
                ],
                properties: {
                    readCount: {
                        type: 'integer'
                    },
                    writeCount: {
                        type: 'integer'
                    },
                    lastRead: {
                        type: 'integer'
                    },
                    lastWrite: {
                        type: 'integer'
                    }
                }
            }
        }
    }
};
