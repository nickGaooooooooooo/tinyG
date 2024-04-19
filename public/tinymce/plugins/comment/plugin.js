; (function () {
  tinymce.PluginManager.add('comment', function (editor) {
    // console.log(editor.settings.commentsProp)
    window.deleteCommentById = deleteCommentById
    var commentsArray = editor.commentsProp //将页面中的评论数组传进来
    var editorHeight = editor.editorHeightProps //传入编辑器的高

    // 注册一个命令，用于在光标位置添加批注
    editor.addCommand('addComment', function () {
      // 弹出评论对话框
      editor.windowManager.open({
        title: 'Add Comment',
        body: {
          type: 'panel',
          items: [
            {
              type: 'textarea',
              name: 'commentContent',
              label: 'Comment Content',
              multiline: true,
              minWidth: 400,
              minHeight: 600,
            },
          ],
        },
        buttons: [
          {
            type: 'cancel',
            text: 'Cancel',
          },
          {
            type: 'submit',
            text: 'Save',
            primary: true,
          },
        ],
        onSubmit: function (api) {
          // 获取评论内容并处理
          var commentText = api.getData().commentContent
          if (commentText) {
            var comment = {
              commentId: 'comment_' + new Date().getTime(),
              // range: editor.selection.getRng(),
              comment: commentText,
            }
            // commentsArray.push(comment)
            editor.addComment(comment)
            // document.getElementById('comments-area').style.display = 'block'
            editor.changeSidebar('1')
            // document.getElementById('comments-area').style.height =
            //   editorHeight + 'px'
            showCommentMark(comment)
          }
          // 在这里进行评论保存或处理的逻辑
          // 例如，可以将评论内容插入到编辑器中
          // editor.insertContent('<span class="comment">' + comment + '</span>')
          // 关闭对话框
          api.close()
        },
      })
    })

    // 注册一个命令，用于显示所有批注
    editor.addCommand('showComments', function () {
      console.log(editorHeight)
      // document.getElementById('comments-area').style.display = 'block'
      editor.changeSidebar('1')
      // document.getElementById('comments-area').style.height =
      //   editorHeight + 'px'
    })

    // 注册一个命令，用于删除当前选中的批注
    editor.addCommand('deleteComment', function () {
      var commentId = getSelectedCommentId()
      console.log(commentId)
      if (commentId) {
        deleteCommentById(commentId) //删除评论区和编辑区该批注
      }
    })
    // 注册一个命令，用于隐藏批注
    editor.addCommand('hideComment', function () {
      // document.getElementById('comments-area').style.display = 'none'
      editor.changeSidebar('')
    })

    // 在编辑器初始化完成后，绑定事件监听，用于显示批注标记
    editor.on('SelectionChange', function () {
      const commentId = getSelectedCommentId()
      if (commentId) {
        // document.getElementById('comments-area').style.display = 'block'
        editor.changeSidebar('1')
        // document.getElementById('comments-area').style.height =
        //   editorHeight + 'px'
        document.getElementById(commentId)?.scrollIntoView() //跳转到锚点

        const a = document.querySelectorAll('.comments-area-comment')
        a.forEach((item) => {
          item.style.background = '#fff'
        })
        if (document.getElementById(commentId)) {
          document.getElementById(commentId).style.background = '#cde6eb'
        }
      }
    })

    // 获取当前选中批注的 ID
    function getSelectedCommentId() {
      var node = editor.selection.getNode() //由于需要鼠标点在图标上识别而不是在图标后，所以需要找到图标的父节点
      if (
        node &&
        node.tagName === 'IMG' &&
        node.getAttribute('data-comment-id')
      ) {
        return node.getAttribute('data-comment-id')
      }
      return null
    }

    // 根据批注 ID 删除评论区的批注 -gao
    function deleteCommentById(commentId) {
      var index = commentsArray.findIndex((comment) => comment.commentId === commentId)
      if (index !== -1) {
        commentsArray.splice(index, 1)
        // editor.selection.getNode().remove()   //不要删除选中节点，改为调用下面方法中根据ID删除评论节点
        remoceCommentNode(commentId)
      }
    }
    //根据批注 ID 删除tinymce编辑区中的评论节点 -gao
    function remoceCommentNode(commentId) {
      if (commentId) {
        // 获取编辑器内容
        var content = editor.getContent()
        // 创建一个临时 DOM 元素来处理编辑器内容
        var tempElement = document.createElement('div')
        tempElement.innerHTML = content
        // 查找具有指定 data-comment-id 属性的元素
        var elementsToRemove = tempElement.querySelectorAll(
          '[data-comment-id="' + commentId + '"]'
        )
        // 从 DOM 中删除找到的元素
        elementsToRemove.forEach(function (element) {
          element.remove()
        })
        // 更新编辑器的内容
        editor.setContent(tempElement.innerHTML)
      }
    }

    // 显示批注标记
    function showCommentMark(comment) {
      const mark = editor.getDoc().createElement('img')
      mark.setAttribute('data-comment-id', comment.commentId)
      mark.setAttribute('id', comment.commentId)
      mark.setAttribute('width', 24)
      mark.setAttribute('height', 24)
      mark.setAttribute('style', "cursor: pointer;")
      // mark.setAttribute('style', "width: 24px; height: 24px; cursor: pointer;")
      mark.setAttribute('src', "http://sztaskhub010.rigoltech.com:8999/file/20230725154616923.png")
      editor.selection.setRng(comment.range)
      editor.selection.setNode(mark)
    }
    // 定义插件的按钮和菜单项
    editor.ui.registry.addButton('addcomment', {
      icon: 'comment-add',
      tooltip: '添加评论',
      onAction: function () {
        editor.execCommand('addComment')
      },
    })

    editor.ui.registry.addButton('showcomments', {
      icon: 'comment',
      tooltip: '显示所有评论',
      onAction: function () {
        editor.execCommand('showComments')
      },
    })

    editor.ui.registry.addButton('deletecomment', {
      icon: 'comment-remove',
      tooltip: '删除评论',
      onAction: function () {
        editor.execCommand('deleteComment')
      },
    })

    editor.ui.registry.addButton('hideComment', {
      icon: 'hide-comment',
      tooltip: '隐藏评论',
      onAction: function () {
        editor.execCommand('hideComment')
      },
    })

    // 添加插件按钮到工具栏
    editor.ui.registry.addGroupToolbarButton('comment', {
      icon: 'comment-gao',
      tooltip: '评论',
      items: 'addcomment showcomments hideComment',
    })
  })
})()
