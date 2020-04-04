const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should be an unique id', () =>{
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});