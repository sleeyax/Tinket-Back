/**
 * Helper service for any document that contains a moderation section (for an Admin)
 */
class ModerationService {
    constructor(repository) {
        this.repo = repository;
    }

    /**
     * Flag a target document (contains inappropriate content for example)
     * @param id
     * @return {Promise<void>}
     */
    async flag(id) {
        try {
            await this.repo.moderate(id, {flaggedAt: new Date()});
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het flaggen');
        }
    }

    /**
     * Mark flagged document for deletion
     * @param id
     * @return {Promise<void>}
     */
    async resolveFlagged(id) {
        try {
            await this.repo.moderate(id, {flagResolvedAt: new Date()});
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het oplossen van een flag');
        }
    }

    /**
     * Ignore flagged document (false positive)
     * @param id
     * @return {Promise<void>}
     */
    async ignoreFlagged(id) {
        try {
            await this.repo.moderate(id, {deletedAt: new Date()});
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het negeren van een flag');
        }
    }
}

module.exports = ModerationService;
