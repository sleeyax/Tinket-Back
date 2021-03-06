const {promiseResponseHelper} = require('../helpers');
const {AssignmentService} = require('../services/index');

class AssignmentController {
    _toAssignmentPayload(req) {
        return {
            title: req.body.title,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            requiredSkills: req.body.requiredSkills,
            location: {
                country: req.body.location.country,
                city: req.body.location.city,
                postalCode: req.body.location.postalCode
            },
            open: req.body.open,
            archivedAt: req.body.archivedAt,
            createdBy: req.user._id
        };
    }

    /**
     * (Admin) get all exclusively flagged assignments
     * @param req
     * @param res
     */
    getAllFlaggedAt(req, res) {
        promiseResponseHelper(req, res, AssignmentService.getAllFlaggedAt());
    }

    /**
     * (Admin) get all exclusively flagResolvedAt assignments
     * @param req
     * @param res
     */
    getAllFlagResolvedAt(req, res) {
        promiseResponseHelper(req, res, AssignmentService.getAllFlagResolvedAt());
    }

    /**
     * (Admin) get all exclusively deletedAt assignments
     * @param req
     * @param res
     */
    getAllDeletedAt(req, res) {
        promiseResponseHelper(req, res, AssignmentService.getAllDeletedAt());
    }

    show(req, res){
        promiseResponseHelper(req, res, AssignmentService.showById(req.params.id));
    }

    showAll(req, res) {
        promiseResponseHelper(req, res, AssignmentService.showAll());
    }

    create(req, res) {
        promiseResponseHelper(req, res, AssignmentService.create(this._toAssignmentPayload(req)));
    }

    update(req, res) {
        promiseResponseHelper(req, res, AssignmentService.update(req.params.id, req.isAdmin ? req.body : this._toAssignmentPayload(req)));
    }

    delete(req, res) {
        promiseResponseHelper(req, res, AssignmentService.delete(req.params.id));
    }

    /**
     * Get the assignments a company (the current user) has created
     * @param req
     * @param res
     */
    showForUser(req, res) {
        promiseResponseHelper(req, res, AssignmentService.getAll(req.params.id));
    }

    /**
     * Show assignments for a specific user, based on their skills
     * @param req
     * @param res
     */
    showRecommendedForUser(req, res) {
        promiseResponseHelper(req, res, AssignmentService.getAllRecommended(req.params.id));
    }

    flag(req, res) {
        promiseResponseHelper(req, res, AssignmentService.flag(req.params.id));
    }

    resolveFlag(req, res) {
        promiseResponseHelper(req, res, AssignmentService.resolveFlagged(req.params.id));
    }

    ignoreFlag(req, res) {
        promiseResponseHelper(req, res, AssignmentService.ignoreFlagged(req.params.id));
    }

    undoIgnoreFlag(req, res) {
        promiseResponseHelper(req, res, AssignmentService.ignoreFlagged(req.params.id, true));
    }
}

module.exports = AssignmentController;
