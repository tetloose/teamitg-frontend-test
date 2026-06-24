export default function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a component, hook, context, or util',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What would you like to generate?',
        choices: ['component', 'hook', 'context', 'util', 'page'],
      },
      {
        type: 'list',
        name: 'directory',
        message: 'Where should this component live?',
        choices: ['atoms', 'molecules', 'components', 'layouts'],
        when: (data) => data.type === 'component',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
      },
    ],
    actions: (data) => {
      if (data.type === 'component') {
        const base = `src/{{directory}}/{{kebabCase name}}`
        return [
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.component.tsx`,
            templateFile: '.plop/component.tsx.hbs',
          },
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.module.scss`,
            templateFile: '.plop/component.module.scss.hbs',
          },
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.types.ts`,
            templateFile: '.plop/types.ts.hbs',
          },
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.constants.ts`,
            templateFile: '.plop/constants.ts.hbs',
          },
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.mock.ts`,
            templateFile: '.plop/mock.ts.hbs',
          },
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.stories.tsx`,
            templateFile: '.plop/stories.tsx.hbs',
          },
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.test.tsx`,
            templateFile: '.plop/test.tsx.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.hooks.ts',
            templateFile: '.plop/hook.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.types.ts',
            templateFile: '.plop/hook-types.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.test.ts',
            templateFile: '.plop/hook-test.ts.hbs',
          },
        ]
      }

      if (data.type === 'hook') {
        return [
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.hooks.ts',
            templateFile: '.plop/hook.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.types.ts',
            templateFile: '.plop/hook-types.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.constants.ts',
            templateFile: '.plop/hook-constants.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.utils.ts',
            templateFile: '.plop/hook-utils.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.mock.ts',
            templateFile: '.plop/hook-mock.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/hooks/use-{{kebabCase name}}/use-{{kebabCase name}}.test.ts',
            templateFile: '.plop/hook-test.ts.hbs',
          },
        ]
      }

      if (data.type === 'context') {
        return [
          {
            type: 'add',
            path: 'src/context/{{kebabCase name}}/{{kebabCase name}}.context.tsx',
            templateFile: '.plop/context.tsx.hbs',
          },
          {
            type: 'add',
            path: 'src/context/{{kebabCase name}}/{{kebabCase name}}.types.ts',
            templateFile: '.plop/context-types.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/context/{{kebabCase name}}/{{kebabCase name}}.constants.ts',
            templateFile: '.plop/context-constants.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/context/{{kebabCase name}}/{{kebabCase name}}.test.ts',
            templateFile: '.plop/context-test.ts.hbs',
          },
        ]
      }

      if (data.type === 'util') {
        return [
          {
            type: 'add',
            path: 'src/utils/{{kebabCase name}}/{{kebabCase name}}.utils.ts',
            templateFile: '.plop/util.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/utils/{{kebabCase name}}/{{kebabCase name}}.types.ts',
            templateFile: '.plop/util-types.ts.hbs',
          },
          {
            type: 'add',
            path: 'src/utils/{{kebabCase name}}/{{kebabCase name}}.test.ts',
            templateFile: '.plop/util-test.ts.hbs',
          },
        ]
      }

      if (data.type === 'page') {
        const base = `src/pages/{{kebabCase name}}`
        return [
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.page.tsx`,
            templateFile: '.plop/page.tsx.hbs',
          },
          {
            type: 'add',
            path: `${base}/{{kebabCase name}}.test.tsx`,
            templateFile: '.plop/page-test.tsx.hbs',
          },
        ]
      }

      return []
    },
  })
}
