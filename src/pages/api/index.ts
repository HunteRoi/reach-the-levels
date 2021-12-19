/**
 * @openapi
 * definitions:
 *   Step:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       done:
 *         type: boolean
 *
 *   Level:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       steps:
 *         type: array
 *         $ref: '#/definitions/Step'
 *       previousLevelId:
 *         type: string
 *       nextLevelId:
 *         type: string
 *
 *   Project:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       levels:
 *         type: array
 *         $ref: '#/definitions/Level'
 *
 *   Error:
 *     properties:
 *       error:
 *         type: string
 */

/**
 * @openapi
 * tags:
 *   - name: Projects
 *   - name: Levels
 *   - name: Steps
 */

export {};
