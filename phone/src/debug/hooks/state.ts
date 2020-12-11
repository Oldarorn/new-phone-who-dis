import { atom } from 'recoil';

export const debugEventState = {
  debugEvents: atom({
    key: 'debugEvents',
    default: [
      {
        action: 'Test',
        data: {
          app: 'NOTES',
          method: 'setNotes',
          data: [
            {
              id: 1,
              title: 'First note',
              content: 'Hello, this is my shitty note',
            },
            {
              id: 2,
              title: 'Second note',
              content: 'Hello, this is another shitty note',
            },
          ],
        },
        message: 'wow',
      },
      {
        action: 'Test',
        data: {
          app: 'NOTES',
          method: 'setNotes',
          data: [
            {
              id: 1,
              title: 'First note',
              content: 'Hello, this is my shitty note',
            },
            {
              id: 2,
              title: 'Second note',
              content: 'Hello, this is another shitty note',
            },
          ],
        },
        message: 'wow',
      },
      {
        action: 'Test',
        data: {
          app: 'NOTES',
          method: 'setNotes',
          data: [
            {
              id: 1,
              title: 'First note',
              content: 'Hello, this is my shitty note',
            },
            {
              id: 2,
              title: 'Second note',
              content: 'Hello, this is another shitty note',
            },
          ],
        },
        message: 'wow',
      },
    ],
  }),
};
