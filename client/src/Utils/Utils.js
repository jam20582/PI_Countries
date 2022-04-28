
export const utils = {
    validate: (input, item) => {
        console.log(input)
        let errors = {};

        if(item === 'name') {
            if (!input.name) errors.name = 'Name is required';
            if (!/^[a-zA-Z ]*$/.test(input.name)) errors.name = 'Name is invalid: must be letters only';
            if (input.name.length > 20 || input.name.length < 3) errors.name = 'Name must be between 3 and 20 characters'
        }

        if (item === 'duration') {
            if (input.duration < 1 || input.duration > 24 || input.duration === '') errors.duration = 'Duration must be between 1 and 24 hours'
        }

        if (item === 'difficulty') {
            if (input.difficulty < 1 || input.difficulty > 5 || input.difficulty === '') errors.difficulty = 'Difficulty must be between 1 and 5'        
        }

        
        if (item === 'season') {
            if (input.season !== 'Summer' || input.season !== 'Autumn' 
                || input.season !== 'Winter' || input.season !== 'Spring') {
                errors.season = 'Season invalid'        
            }
        }

        if(item === 'countryID'){
            if(!input.countryID[0]) errors.countryID = 'At least one country need to be selected'
        }
        return errors;
    },

    isObjEmpty: (obj) =>{
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return true;
        }    
        return false;
    }
}
