import {
  assert
} from 'chai';

import iOSScreenshotStrategy from '../../../../src/utils/strategies/iOSScreenshotStrategy';
import ScreenDimension from '../../../../src/utils/ScreenDimension';

import testStrategy from '../../../helper/testStrategy';

// iOS 7.0 iPad Air
import dimensionIosIpadAir70PortraitScrollVertical from '../../../fixture/dimension/iOS_iPad_Air_7_0_portrait_scroll_vertical.json';
import dimensionIosIpadAir70LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPad_Air_7_0_landscape_scroll_vertical.json';
import dimensionIosIpadAir70PortraitZoomed from '../../../fixture/dimension/iOS_iPad_Air_7_0_portrait_zoomed.json';
import dimensionIosIpadAir70LandscapeZoomed from '../../../fixture/dimension/iOS_iPad_Air_7_0_landscape_zoomed.json';

// iOS 8.4 iPad Air
import dimensionIosIpadAir84PortraitScrollVertical from '../../../fixture/dimension/iOS_iPad_Air_8_4_portrait_scroll_vertical.json';
import dimensionIosIpadAir84LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPad_Air_8_4_landscape_scroll_vertical.json';
import dimensionIosIpadAir84PortraitZoomed from '../../../fixture/dimension/iOS_iPad_Air_8_4_portrait_zoomed.json';
import dimensionIosIpadAir84LandscapeZoomed from '../../../fixture/dimension/iOS_iPad_Air_8_4_landscape_zoomed.json';

// iOS 9.2 iPad Air
import dimensionIosIpadAir92PortraitScrollVertical from '../../../fixture/dimension/iOS_iPad_Air_9_2_portrait_scroll_vertical.json';
import dimensionIosIpadAir92LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPad_Air_9_2_landscape_scroll_vertical.json';
import dimensionIosIpadAir92PortraitZoomed from '../../../fixture/dimension/iOS_iPad_Air_9_2_portrait_zoomed.json';
import dimensionIosIpadAir92LandscapeZoomed from '../../../fixture/dimension/iOS_iPad_Air_9_2_landscape_zoomed.json';

// iOS 7.0 iPhone 5s
import dimensionIosIphone5s70PortraitScrollVertical from '../../../fixture/dimension/iOS_iPhone5s_7_0_portrait_scroll_vertical.json';
import dimensionIosIphone5s70LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPhone5s_7_0_landscape_scroll_vertical.json';
import dimensionIosIphone5s70PortraitZoomed from '../../../fixture/dimension/iOS_iPhone5s_7_0_portrait_zoomed.json';
import dimensionIosIphone5s70LandscapeZoomed from '../../../fixture/dimension/iOS_iPhone5s_7_0_landscape_zoomed.json';

// iOS 8.4 iPhone 5s
import dimensionIosIphone5s84PortraitScrollVertical from '../../../fixture/dimension/iOS_iPhone5s_8_4_portrait_scroll_vertical.json';
import dimensionIosIphone5s84LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPhone5s_8_4_landscape_scroll_vertical.json';
import dimensionIosIphone5s84PortraitZoomed from '../../../fixture/dimension/iOS_iPhone5s_8_4_portrait_zoomed.json';
import dimensionIosIphone5s84LandscapeZoomed from '../../../fixture/dimension/iOS_iPhone5s_8_4_landscape_zoomed.json';

// iOS 9.2 iPhone 5s
import dimensionIosIphone5s92PortraitScrollVertical from '../../../fixture/dimension/iOS_iPhone5s_9_2_portrait_scroll_vertical.json';
import dimensionIosIphone5s92LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPhone5s_9_2_landscape_scroll_vertical.json';
import dimensionIosIphone5s92PortraitZoomed from '../../../fixture/dimension/iOS_iPhone5s_9_2_portrait_zoomed.json';
import dimensionIosIphone5s92LandscapeZoomed from '../../../fixture/dimension/iOS_iPhone5s_9_2_landscape_zoomed.json';

// iOS 8.4 iPhone 6
import dimensionIosIphone684PortraitScrollVertical from '../../../fixture/dimension/iOS_iPhone6_8_4_portrait_scroll_vertical.json';
import dimensionIosIphone684LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPhone6_8_4_landscape_scroll_vertical.json';
import dimensionIosIphone684PortraitZoomed from '../../../fixture/dimension/iOS_iPhone6_8_4_portrait_zoomed.json';
import dimensionIosIphone684LandscapeZoomed from '../../../fixture/dimension/iOS_iPhone6_8_4_landscape_zoomed.json';

// iOS 9.3 iPhone 6
import dimensionIosIphone693PortraitScrollVertical from '../../../fixture/dimension/iOS_iPhone6_9_3_portrait_scroll_vertical.json';
import dimensionIosIphone693LandscapeScrollVertical from '../../../fixture/dimension/iOS_iPhone6_9_3_landscape_scroll_vertical.json';
import dimensionIosIphone693PortraitZoomed from '../../../fixture/dimension/iOS_iPhone6_9_3_portrait_zoomed.json';
import dimensionIosIphone693LandscapeZoomed from '../../../fixture/dimension/iOS_iPhone6_9_3_landscape_zoomed.json';

describe('iOSScreenshotStrategy', function () {

  const browser = {
    isMobile: true,
    isIOS: true,
    isAndroid: false,
    desiredCapabilities: {
      browserName: 'safari',
      //"device-orientation": "portait", // portrait is default
    },
  };


  context('iPad', function () {

    context('fullpage', function () {

      context('handles vertical scroll & crop', function () {
        context('portrait', function () {
          const testCases = [
            {
              device: "iPad Air 7.0",
              dimensions: dimensionIosIpadAir70PortraitScrollVertical,
            },
            {
              device: "iPad Air 8.4",
              dimensions: dimensionIosIpadAir84PortraitScrollVertical,
            },
            {
              device: "iPad Air 9.2",
              dimensions: dimensionIosIpadAir92PortraitScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight();

              const scrollY = (index) => index * screenDimensions.getViewportHeight();
              const remainHeight = (index) => (screenDimensions.getDocumentHeight() - index * screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio();

              const crop = {
                width: screenDimensions.getViewportWidth() * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);

              const steps = [
                {
                  scroll: { x: 0, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(2), indexX: 0, indexY: 2 },
                  crop: {
                    ...crop,
                    height: remainHeight(2)
                  }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });

        context('landscape', function () {
          const testCases = [
            {
              device: "iPad Air 7.0",
              dimensions: dimensionIosIpadAir70LandscapeScrollVertical,
            },
            {
              device: "iPad Air 8.4",
              dimensions: dimensionIosIpadAir84LandscapeScrollVertical,
            },
            {
              device: "iPad Air 9.2",
              dimensions: dimensionIosIpadAir92LandscapeScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight();
              const scrollY = (index) => index * screenDimensions.getViewportHeight();
              const remainHeight = (index) => (screenDimensions.getDocumentHeight() - index * screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio();

              const crop = {
                width: screenDimensions.getViewportWidth() * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);

              const steps = [
                {
                  scroll: { x: 0, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(2), indexX: 0, indexY: 2 },
                  crop: {
                    ...crop,
                    height: remainHeight(2)
                  }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });
      });

    });

    context('element', function() {
      context('handles vertical scroll & crop', function () {
        context('portrait', function () {
          const testCases = [
            {
              device: "iPad Air 7.0",
              dimensions: dimensionIosIpadAir70PortraitScrollVertical,
            },
            {
              device: "iPad Air 8.4",
              dimensions: dimensionIosIpadAir84PortraitScrollVertical,
            },
            {
              device: "iPad Air 9.2",
              dimensions: dimensionIosIpadAir92PortraitScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight();

              const startX = 50;
              const startY = 100;
              const endX = 300;
              const endY = 1300;

              const scrollY = (index) => index * screenDimensions.getViewportHeight() + startY;

              const crop = {
                width: (endX - startX) * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);
              strategy.setScrollArea(startX, startY, endX, endY);

              const steps = [
                {
                  scroll: { x: startX, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: startX, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop: {
                      ...crop,
                      height: (endY - startY - screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio()
                    }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });

        context('landscape', function () {
          const testCases = [
            {
              device: "iPad Air 7.0",
              dimensions: dimensionIosIpadAir70LandscapeScrollVertical,
            },
            {
              device: "iPad Air 8.4",
              dimensions: dimensionIosIpadAir84LandscapeScrollVertical,
            },
            {
              device: "iPad Air 9.2",
              dimensions: dimensionIosIpadAir92LandscapeScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight();

              const startX = 50;
              const startY = 100;
              const endX = 300;
              const endY = 1100;

              const scrollY = (index) => index * screenDimensions.getViewportHeight() + startY;

              const crop = {
                width: (endX - startX) * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);
              strategy.setScrollArea(startX, startY, endX, endY);

              const steps = [
                {
                  scroll: { x: startX, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: startX, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop: {
                    ...crop,
                    height: (endY - startY - screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio()
                  }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });
      });
    });

    context('handles zoom to fit document (throws unsupported error)', function () {
      const scaleError = 'Websites with scaling are not supported yet. Please use the following meta tag in your head until this is fixed: <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';

      context('portrait', function () {
        const testCases = [
          {
            device: "iPad Air 7.0",
            dimensions: dimensionIosIpadAir70PortraitZoomed,
          },
          {
            device: "iPad Air 8.4",
            dimensions: dimensionIosIpadAir84PortraitZoomed,
          },
          {
            device: "iPad Air 9.2",
            dimensions: dimensionIosIpadAir92PortraitZoomed,
          },
        ];

        testCases.forEach(function ({ device, dimensions }) {
          it(device, function () {
            const screenDimensions = new ScreenDimension(dimensions);

            const createStrategy = () => new iOSScreenshotStrategy(screenDimensions, browser);

            assert.throws(createStrategy, scaleError);

          });
        });
      });

      context('landscape', function () {
        const testCases = [
          {
            device: "iPad Air 7.0",
            dimensions: dimensionIosIpadAir70LandscapeZoomed,
          },
          {
            device: "iPad Air 8.4",
            dimensions: dimensionIosIpadAir84LandscapeZoomed,
          },
          {
            device: "iPad Air 9.2",
            dimensions: dimensionIosIpadAir92LandscapeZoomed,
          },
        ];

        testCases.forEach(function ({ device, dimensions }) {
          it(device, function () {
            const screenDimensions = new ScreenDimension(dimensions);

            const createStrategy = () => new iOSScreenshotStrategy(screenDimensions, browser);

            assert.throws(createStrategy, scaleError);

          });
        });
      });
    });
  });

  context('iPhone 5s', function () {

    context('fullpage', function () {

      context('handles vertical scroll & crop', function () {
        context('portrait', function () {
          const testCases = [
            {
              device: "iPhone 5s 7.0",
              dimensions: dimensionIosIphone5s70PortraitScrollVertical,
            },
            {
              device: "iPhone 5s 8.4",
              dimensions: dimensionIosIphone5s84PortraitScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight() - 44;

              const scrollY = (index) => index * screenDimensions.getViewportHeight();
              const remainHeight = (index) => (screenDimensions.getDocumentHeight() - index * screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio();

              const crop = {
                width: screenDimensions.getViewportWidth() * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);

              const steps = [
                {
                  scroll: { x: 0, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(2), indexX: 0, indexY: 2 },
                  crop: {
                    ...crop,
                    height: remainHeight(2)
                  }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });

        context('landscape', function () {
          const testCases = [
            {
              device: "iPhone 5s 7.0",
              dimensions: dimensionIosIphone5s70LandscapeScrollVertical,
            },
            {
              device: "iPhone 5s 8.4",
              dimensions: dimensionIosIphone5s84LandscapeScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight() - 44;

              const scrollY = (index) => index * screenDimensions.getViewportHeight();
              const remainHeight = (index) => (screenDimensions.getDocumentHeight() - index * screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio();

              const crop = {
                width: screenDimensions.getViewportWidth() * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);

              const steps = [
                {
                  scroll: { x: 0, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(2), indexX: 0, indexY: 2 },
                  crop: {
                    ...crop,
                    height: remainHeight(2)
                  }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });
      });
    });

    context('handles zoom to fit document (throws unsupported error)', function () {
      const scaleError = 'Websites with scaling are not supported yet. Please use the following meta tag in your head until this is fixed: <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';

      context('portrait', function () {
        const testCases = [
          {
            device: "iPhone 5s 7.0",
            dimensions: dimensionIosIphone5s70PortraitZoomed,
          },
          {
            device: "iPhone 5s 8.4",
            dimensions: dimensionIosIphone5s84PortraitZoomed,
          },
        ];

        testCases.forEach(function ({ device, dimensions }) {
          it(device, function () {
            const screenDimensions = new ScreenDimension(dimensions);

            const createStrategy = () => new iOSScreenshotStrategy(screenDimensions, browser);

            assert.throws(createStrategy, scaleError);

          });
        });
      });

      context('landscape', function () {
        const testCases = [
          {
            device: "iPhone 5s 7.0",
            dimensions: dimensionIosIphone5s70LandscapeZoomed,
          },
          {
            device: "iPhone 5s 8.4",
            dimensions: dimensionIosIphone5s84LandscapeZoomed,
          },
        ];

        testCases.forEach(function ({ device, dimensions }) {
          it(device, function () {
            const screenDimensions = new ScreenDimension(dimensions);

            const createStrategy = () => new iOSScreenshotStrategy(screenDimensions, browser);

            assert.throws(createStrategy, scaleError);

          });
        });
      });
    });
  });

  context('iPhone 6', function () {

    context('fullpage', function () {

      context('handles vertical scroll & crop', function () {
        context('portrait', function () {
          const testCases = [
            {
              device: "iPhone 6 8.4",
              dimensions: dimensionIosIphone684PortraitScrollVertical,
            },
            {
              device: "iPhone 6 9.3",
              dimensions: dimensionIosIphone693PortraitScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight() - 44;

              const scrollY = (index) => index * screenDimensions.getViewportHeight();
              const remainHeight = (index) => (screenDimensions.getDocumentHeight() - index * screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio();

              const crop = {
                width: screenDimensions.getViewportWidth() * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);

              const steps = [
                {
                  scroll: { x: 0, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(2), indexX: 0, indexY: 2 },
                  crop: {
                    ...crop,
                    height: remainHeight(2)
                  }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });

        context('landscape', function () {
          const testCases = [
            {
              device: "iPhone 6 8.4",
              dimensions: dimensionIosIphone684LandscapeScrollVertical,
            },
            {
              device: "iPhone 6 9.3",
              dimensions: dimensionIosIphone693LandscapeScrollVertical,
            },
          ];

          testCases.forEach(function ({ device, dimensions }) {
            it(device, function () {
              // Note: status & navigation bar is shown
              const screenDimensions = new ScreenDimension(dimensions);

              const barHeight = screenDimensions.getScreenHeight() - screenDimensions.getViewportHeight() - 44;

              const scrollY = (index) => index * screenDimensions.getViewportHeight();
              const remainHeight = (index) => (screenDimensions.getDocumentHeight() - index * screenDimensions.getViewportHeight()) * screenDimensions.getPixelRatio();

              const crop = {
                width: screenDimensions.getViewportWidth() * screenDimensions.getPixelRatio(),
                height: screenDimensions.getViewportHeight() * screenDimensions.getPixelRatio(),
                x: 0 * screenDimensions.getPixelRatio(),
                y: barHeight * screenDimensions.getPixelRatio(),
                rotation: 0,
                gravity: 'NorthWest'
              };

              const strategy = new iOSScreenshotStrategy(screenDimensions, browser);

              const steps = [
                {
                  scroll: { x: 0, y: scrollY(0), indexX: 0, indexY: 0 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(1), indexX: 0, indexY: 1 },
                  crop,
                },
                {
                  scroll: { x: 0, y: scrollY(2), indexX: 0, indexY: 2 },
                  crop: {
                    ...crop,
                    height: remainHeight(2)
                  }
                },
              ];

              // then & when
              testStrategy(strategy, steps);
            });
          });
        });
      });
    });

    context('handles zoom to fit document (throws unsupported error)', function () {
      const scaleError = 'Websites with scaling are not supported yet. Please use the following meta tag in your head until this is fixed: <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';

      context('portrait', function () {
        const testCases = [
          {
            device: "iPhone 6 8.4",
            dimensions: dimensionIosIphone684PortraitZoomed,
          },
          {
            device: "iPhone 6 9.3",
            dimensions: dimensionIosIphone693PortraitZoomed,
          },
        ];

        testCases.forEach(function ({ device, dimensions }) {
          it(device, function () {
            const screenDimensions = new ScreenDimension(dimensions);

            const createStrategy = () => new iOSScreenshotStrategy(screenDimensions, browser);

            assert.throws(createStrategy, scaleError);

          });
        });
      });

      context('landscape', function () {
        const testCases = [
          {
            device: "iPhone 6 8.4",
            dimensions: dimensionIosIphone684LandscapeZoomed,
          },
          {
            device: "iPhone 6 9.3",
            dimensions: dimensionIosIphone693LandscapeZoomed,
          },
        ];

        testCases.forEach(function ({ device, dimensions }) {
          it(device, function () {
            const screenDimensions = new ScreenDimension(dimensions);

            const createStrategy = () => new iOSScreenshotStrategy(screenDimensions, browser);

            assert.throws(createStrategy, scaleError);

          });
        });
      });
    });
  });


});
