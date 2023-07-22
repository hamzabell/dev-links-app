export default class User {
    constructor(id, email, password, profile_image, firstName, lastName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile_image = profile_image;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}