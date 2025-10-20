import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set up public permissions for all content types
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      // Grant public access to read all blog-related content types
      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::blog.blog.find',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::blog.blog.findOne',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::author.author.find',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::author.author.findOne',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::category.category.find',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::category.category.findOne',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::tag.tag.find',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .create({
          data: {
            action: 'api::tag.tag.findOne',
            subject: null,
            properties: {},
            conditions: [],
            role: publicRole.id,
          },
        });
    }

    // Create default categories if they don't exist
    const existingCategories = await strapi.entityService.findMany('api::category.category');
    if (existingCategories.length === 0) {
      const defaultCategories = [
        { name: 'Technology', description: 'Posts about technology and programming', color: '#3B82F6', slug: 'technology' },
        { name: 'Web Development', description: 'Posts about web development', color: '#10B981', slug: 'web-development' },
        { name: 'React', description: 'Posts about React and frontend development', color: '#61DAFB', slug: 'react' },
        { name: 'Tutorials', description: 'Step-by-step tutorials', color: '#F59E0B', slug: 'tutorials' },
        { name: 'News', description: 'Latest news and updates', color: '#EF4444', slug: 'news' }
      ];

      for (const category of defaultCategories) {
        await strapi.entityService.create('api::category.category', {
          data: category
        });
      }
    }

    // Create default tags if they don't exist
    const existingTags = await strapi.entityService.findMany('api::tag.tag');
    if (existingTags.length === 0) {
      const defaultTags = [
        { name: 'javascript', slug: 'javascript' },
        { name: 'react', slug: 'react' },
        { name: 'typescript', slug: 'typescript' },
        { name: 'nodejs', slug: 'nodejs' },
        { name: 'css', slug: 'css' },
        { name: 'html', slug: 'html' },
        { name: 'tutorial', slug: 'tutorial' },
        { name: 'guide', slug: 'guide' },
        { name: 'tips', slug: 'tips' },
        { name: 'tricks', slug: 'tricks' },
        { name: 'beginner', slug: 'beginner' },
        { name: 'advanced', slug: 'advanced' }
      ];

      for (const tag of defaultTags) {
        await strapi.entityService.create('api::tag.tag', {
          data: tag
        });
      }
    }
  },
};
