module.exports = {
    UserRepository:  new (require('./UserRepository'))(),
    AssignmentRepository:  new (require('./AssignmentRepository'))(),
    SkillRepository:  new (require('./SkillRepository'))(),
    ReviewRepository:  new (require('./ReviewRepository'))(),
    ApplicationRepository: new (require('./ApplicationRepository'))(),
    UploadRepository: new (require('./UploadRepository'))()
};
