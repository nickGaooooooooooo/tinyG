/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.10.3 (2022-02-09)
 */
; (function () {
  tinymce.PluginManager.add('toc', function (editor) {
    window.aaaa = '1234'
    const getTocClass = () => {
      return editor.getParam('toc_class', 'mce-toc');
    };

    const getTocHeader = () => {
      const tagName = editor.getParam('toc_header', 'h2');
      return /^h[1-6]$/i.test(tagName) ? tagName : 'h2';
    };

    const getTocDepth = () => {
      const depth = parseInt(editor.getParam('toc_depth', '3'), 10);
      return depth >= 1 && depth <= 9 ? depth : 3;
    };

    const create = (prefix) => {
      let counter = 0;
      return () => {
        const guid = new Date().getTime().toString(32);
        return prefix + guid + (counter++).toString(32);
      };
    };

    const scrollToElement = (id) => {
      console.log(editor.getBody())
      // const element = editor.getBody().querySelector(`#${id}`);
      const element = editor.getBody().querySelector(`[id="${id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // 点击事件处理程序，处理目录点击跳转到相应内容
    const handleClick = (e) => {
      e.preventDefault();
      const target = e.target;
      if (target.tagName.toLowerCase() === 'a' && target.hasAttribute('href')) {
        const href = target.getAttribute('href').replace('#', '');
        scrollToElement(href);
      }
    };

    const setupClickEvent = () => {
      const tocClass = getTocClass();
      editor.on('click', (e) => {
        const $tocElm = editor.getBody().querySelector(`.${tocClass}`);
        if ($tocElm && e.target.closest(`.${tocClass}`)) {
          handleClick(e);
        }
      });
    };

    setupClickEvent();

    const tocId = create('mcetoc_');

    const readHeaders = () => {
      const tocClass = getTocClass();
      const headerTag = getTocHeader();
      const selector = `h1, h2, h3, h4, h5, h6`;
      const headers = Array.from(editor.getBody().querySelectorAll(selector)).filter(item => item.id !== 'toc-title');
      if (headers.length && /^h[1-9]$/i.test(headerTag)) {
        return headers.filter((el) => !el.classList.contains(tocClass)).map((h) => {
          const id = h.id ? h.id : tocId();
          return {
            id,
            level: parseInt(h.tagName.replace(/^H/i, ''), 10),
            title: h.textContent,
            element: h,
          };
        });
      }
      return [];
    };

    const generateTocContentHtml = () => {
      const headers = readHeaders();
      const minLevel = headers.reduce((min, h) => Math.min(min, h.level), 9);

      let html = '';
      if (!headers.length) {
        return html;
      }

      html += `<${getTocHeader()} id="toc-title" contenteditable="true">${editor.translate('目录')}</${getTocHeader()}>`;
      let prevLevel = minLevel - 1;

      headers.forEach((h) => {
        h.element.id = h.id;
        const nextLevel = headers[headers.indexOf(h) + 1]?.level || null;

        if (prevLevel === h.level) {
          html += '<li>';
        } else {
          for (let i = prevLevel; i < h.level; i++) {
            html += '<ul><li>';
          }
        }

        html += `<a href="#${h.id}">${h.title}</a>`;

        if (nextLevel === h.level || !nextLevel) {
          html += '</li>';
          if (!nextLevel) {
            html += '</ul>';
          }
        } else {
          for (let i = h.level; i > nextLevel; i--) {
            if (i === nextLevel + 1) {
              html += '</li></ul><li>';
            } else {
              html += '</li></ul>';
            }
          }
        }

        prevLevel = h.level;
      });

      return html;
    };

    const insertToc = () => {
      const tocClass = getTocClass();
      const $tocElm = editor.getBody().querySelector(`.${tocClass}`);
      const tocHtml = generateTocContentHtml();

      if (!$tocElm || !$tocElm.textContent) {
        editor.insertContent(`<div class="${tocClass}" contenteditable="false">${tocHtml}</div>`);
      } else {
        updateToc(tocHtml);
      }
    };

    const updateToc = (tocHtml) => {
      const tocClass = getTocClass();
      const $tocElm = editor.getBody().querySelector(`.${tocClass}`);
      if ($tocElm) {
        editor.undoManager.transact(() => {
          $tocElm.innerHTML = tocHtml;
        });
      }
    };
    // const updateToc = (tocHtml) => {
    //   const tocClass = getTocClass();
    //   const $tocElm = editor.getBody().querySelector(`.${tocClass}`);
    //   if ($tocElm) {
    //     editor.undoManager.transact(() => {
    //       // 清理旧的 id 属性
    //       const headers = readHeaders();
    //       headers.forEach((h) => {
    //         h.element.removeAttribute('id');
    //       });

    //       // 重新生成唯一的 id 并更新目录内容
    //       $tocElm.innerHTML = tocHtml;
    //       const newHeaders = readHeaders();
    //       newHeaders.forEach((h, index) => {
    //         h.element.id = `toc_${index + 1}`;
    //       });
    //     });
    //   }
    // };

    editor.addCommand('mceInsertToc', () => {
      insertToc();
    });

    editor.addCommand('mceUpdateToc', () => {
      const tocHtml = generateTocContentHtml();
      updateToc(tocHtml);
    });

    editor.ui.registry.addButton('toc', {
      icon: 'toc',
      tooltip: '目录',
      onAction: () => {
        insertToc();
      },
    });

    editor.ui.registry.addButton('tocupdate', {
      icon: 'reload',
      tooltip: 'Update',
      onAction: () => {
        const tocHtml = generateTocContentHtml();
        updateToc(tocHtml);
      },
    });

    editor.ui.registry.addMenuItem('toc', {
      icon: 'toc',
      text: '目录',
      onAction: () => {
        insertToc();
      },
    });

    editor.ui.registry.addContextToolbar('toc', {
      items: 'tocupdate',
      predicate: (node) => node.classList.contains(getTocClass()),
      scope: 'node',
      position: 'node',
    });
  });
})()
