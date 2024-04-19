;(function () {
  const e = (e) => {
      let t = e
      return {
        get: () => t,
        set: (e) => {
          t = e
        },
      }
    },
    t = (e) => parseInt(e, 10),
    r = (e, t) => {
      const r = e - t
      return 0 === r ? 0 : r > 0 ? 1 : -1
    },
    o = (e, t, r) => ({
      major: e,
      minor: t,
      patch: r,
    }),
    n = (e) => {
      const r = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e)
      return r ? o(t(r[1]), t(r[2]), t(r[3])) : o(0, 0, 0)
    },
    s = (e) => (t) =>
      ((e) => {
        const t = typeof e
        return null === e
          ? 'null'
          : 'object' === t && Array.isArray(e)
          ? 'array'
          : 'object' === t &&
            ((r = o = e),
            (n = String).prototype.isPrototypeOf(r) ||
              (null === (s = o.constructor) || void 0 === s
                ? void 0
                : s.name) === n.name)
          ? 'string'
          : t
        var r, o, n, s
      })(t) === e,
    a = (e) => (t) => typeof t === e,
    i = s('string'),
    c = s('array'),
    l = a('boolean'),
    m = (e) => !((e) => null == e)(e),
    u = a('function'),
    d = a('number'),
    g = (e) => () => e,
    h = (e) => e,
    f = g(!1),
    p = g(!0)
  class v {
    constructor(e, t) {
      ;(this.tag = e), (this.value = t)
    }
    static some(e) {
      return new v(!0, e)
    }
    static none() {
      return v.singletonNone
    }
    fold(e, t) {
      return this.tag ? t(this.value) : e()
    }
    isSome() {
      return this.tag
    }
    isNone() {
      return !this.tag
    }
    map(e) {
      return this.tag ? v.some(e(this.value)) : v.none()
    }
    bind(e) {
      return this.tag ? e(this.value) : v.none()
    }
    exists(e) {
      return this.tag && e(this.value)
    }
    forall(e) {
      return !this.tag || e(this.value)
    }
    filter(e) {
      return !this.tag || e(this.value) ? this : v.none()
    }
    getOr(e) {
      return this.tag ? this.value : e
    }
    or(e) {
      return this.tag ? this : e
    }
    getOrThunk(e) {
      return this.tag ? this.value : e()
    }
    orThunk(e) {
      return this.tag ? this : e()
    }
    getOrDie(e) {
      if (this.tag) return this.value
      throw new Error(null != e ? e : 'Called getOrDie on None')
    }
    static from(e) {
      return m(e) ? v.some(e) : v.none()
    }
    getOrNull() {
      return this.tag ? this.value : null
    }
    getOrUndefined() {
      return this.value
    }
    each(e) {
      this.tag && e(this.value)
    }
    toArray() {
      return this.tag ? [this.value] : []
    }
    toString() {
      return this.tag ? `some(${this.value})` : 'none()'
    }
  }
  v.singletonNone = new v(!1)
  const b = Array.prototype.indexOf,
    y = Array.prototype.push,
    S = (e, t) => {
      return (r = e), (o = t), b.call(r, o) > -1
      var r, o
    },
    w = (e, t) => {
      for (let r = 0, o = e.length; r < o; r++) if (t(e[r], r)) return !0
      return !1
    },
    x = (e, t) => {
      const r = e.length,
        o = new Array(r)
      for (let n = 0; n < r; n++) {
        const r = e[n]
        o[n] = t(r, n)
      }
      return o
    },
    k = (e, t) => {
      const r = []
      for (let o = 0, n = e.length; o < n; o++) {
        const n = e[o]
        t(n, o) && r.push(n)
      }
      return r
    },
    A = (e, t) =>
      ((e, t, r) => {
        for (let o = 0, n = e.length; o < n; o++) {
          const n = e[o]
          if (t(n, o)) return v.some(n)
          if (r(n, o)) break
        }
        return v.none()
      })(e, t, f),
    O = (e, t) =>
      ((e) => {
        const t = []
        for (let r = 0, o = e.length; r < o; ++r) {
          if (!c(e[r]))
            throw new Error(
              'Arr.flatten item ' + r + ' was not an array, input: ' + e
            )
          y.apply(t, e[r])
        }
        return t
      })(x(e, t)),
    C = () => L(0, 0),
    L = (e, t) => ({
      major: e,
      minor: t,
    }),
    R = {
      nu: L,
      detect: (e, t) => {
        const r = String(t).toLowerCase()
        return 0 === e.length
          ? C()
          : ((e, t) => {
              const r = ((e, t) => {
                for (let r = 0; r < e.length; r++) {
                  const o = e[r]
                  if (o.test(t)) return o
                }
              })(e, t)
              if (!r)
                return {
                  major: 0,
                  minor: 0,
                }
              const o = (e) => Number(t.replace(r, '$' + e))
              return L(o(1), o(2))
            })(e, r)
      },
      unknown: C,
    },
    T = (e, t) => {
      const r = String(t).toLowerCase()
      return A(e, (e) => e.search(r))
    },
    _ = (e, t) => -1 !== e.indexOf(t),
    P = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
    F = (e) => (t) => _(t, e),
    E = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: (e) =>
          _(e, 'edge/') &&
          _(e, 'chrome') &&
          _(e, 'safari') &&
          _(e, 'applewebkit'),
      },
      {
        name: 'Chromium',
        brand: 'Chromium',
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, P],
        search: (e) => _(e, 'chrome') && !_(e, 'chromeframe'),
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/,
        ],
        search: (e) => _(e, 'msie') || _(e, 'trident'),
      },
      {
        name: 'Opera',
        versionRegexes: [P, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: F('opera'),
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: F('firefox'),
      },
      {
        name: 'Safari',
        versionRegexes: [P, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: (e) =>
          (_(e, 'safari') || _(e, 'mobile/')) && _(e, 'applewebkit'),
      },
    ],
    N = [
      {
        name: 'Windows',
        search: F('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/],
      },
      {
        name: 'iOS',
        search: (e) => _(e, 'iphone') || _(e, 'ipad'),
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/,
        ],
      },
      {
        name: 'Android',
        search: F('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/],
      },
      {
        name: 'macOS',
        search: F('mac os x'),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/],
      },
      {
        name: 'Linux',
        search: F('linux'),
        versionRegexes: [],
      },
      {
        name: 'Solaris',
        search: F('sunos'),
        versionRegexes: [],
      },
      {
        name: 'FreeBSD',
        search: F('freebsd'),
        versionRegexes: [],
      },
      {
        name: 'ChromeOS',
        search: F('cros'),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/],
      },
    ],
    B = {
      browsers: g(E),
      oses: g(N),
    },
    D = 'Edge',
    I = 'Chromium',
    j = 'Opera',
    M = 'Firefox',
    V = 'Safari',
    U = (e) => {
      const t = e.current,
        r = e.version,
        o = (e) => () => t === e
      return {
        current: t,
        version: r,
        isEdge: o(D),
        isChromium: o(I),
        isIE: o('IE'),
        isOpera: o(j),
        isFirefox: o(M),
        isSafari: o(V),
      }
    },
    W = () =>
      U({
        current: void 0,
        version: R.unknown(),
      }),
    $ = U,
    q = (g(D), g(I), g('IE'), g(j), g(M), g(V), 'Windows'),
    z = 'Android',
    K = 'Linux',
    Z = 'macOS',
    G = 'Solaris',
    H = 'FreeBSD',
    J = 'ChromeOS',
    Q = (e) => {
      const t = e.current,
        r = e.version,
        o = (e) => () => t === e
      return {
        current: t,
        version: r,
        isWindows: o(q),
        isiOS: o('iOS'),
        isAndroid: o(z),
        isMacOS: o(Z),
        isLinux: o(K),
        isSolaris: o(G),
        isFreeBSD: o(H),
        isChromeOS: o(J),
      }
    },
    X = () =>
      Q({
        current: void 0,
        version: R.unknown(),
      }),
    Y = Q,
    ee =
      (g(q),
      g('iOS'),
      g(z),
      g(K),
      g(Z),
      g(G),
      g(H),
      g(J),
      (e, t, r) => {
        const o = B.browsers(),
          n = B.oses(),
          s = t
            .bind((e) =>
              ((e, t) =>
                ((e, t) => {
                  for (let r = 0; r < e.length; r++) {
                    const o = t(e[r])
                    if (o.isSome()) return o
                  }
                  return v.none()
                })(t.brands, (t) => {
                  const r = t.brand.toLowerCase()
                  return A(e, (e) => {
                    var t
                    return (
                      r ===
                      (null === (t = e.brand) || void 0 === t
                        ? void 0
                        : t.toLowerCase())
                    )
                  }).map((e) => ({
                    current: e.name,
                    version: R.nu(parseInt(t.version, 10), 0),
                  }))
                }))(o, e)
            )
            .orThunk(() =>
              ((e, t) =>
                T(e, t).map((e) => {
                  const r = R.detect(e.versionRegexes, t)
                  return {
                    current: e.name,
                    version: r,
                  }
                }))(o, e)
            )
            .fold(W, $),
          a = ((e, t) =>
            T(e, t).map((e) => {
              const r = R.detect(e.versionRegexes, t)
              return {
                current: e.name,
                version: r,
              }
            }))(n, e).fold(X, Y),
          i = ((e, t, r, o) => {
            const n = e.isiOS() && !0 === /ipad/i.test(r),
              s = e.isiOS() && !n,
              a = e.isiOS() || e.isAndroid(),
              i = a || o('(pointer:coarse)'),
              c = n || (!s && a && o('(min-device-width:768px)')),
              l = s || (a && !c),
              m = t.isSafari() && e.isiOS() && !1 === /safari/i.test(r),
              u = !l && !c && !m
            return {
              isiPad: g(n),
              isiPhone: g(s),
              isTablet: g(c),
              isPhone: g(l),
              isTouch: g(i),
              isAndroid: e.isAndroid,
              isiOS: e.isiOS,
              isWebView: g(m),
              isDesktop: g(u),
            }
          })(a, s, e, r)
        return {
          browser: s,
          os: a,
          deviceType: i,
        }
      }),
    te = (e) => window.matchMedia(e).matches
  let re = ((e) => {
    let t,
      r = !1
    return (...o) => (r || ((r = !0), (t = e.apply(null, o))), t)
  })(() => ee(navigator.userAgent, v.from(navigator.userAgentData), te))
  const oe = () => re(),
    ne = Object.keys,
    se = Object.hasOwnProperty,
    ae = (e, t) => {
      const r = ne(e)
      for (let o = 0, n = r.length; o < n; o++) {
        const n = r[o]
        t(e[n], n)
      }
    },
    ie = (e, t) => {
      const r = {}
      return (
        ae(e, (e, o) => {
          const n = t(e, o)
          r[n.k] = n.v
        }),
        r
      )
    },
    ce = (e) => (t, r) => {
      e[r] = t
    },
    le = (e) =>
      ((e, t) => {
        const r = []
        return (
          ae(e, (e, o) => {
            r.push(t(e, o))
          }),
          r
        )
      })(e, h),
    me = (e, t) => (ue(e, t) ? v.from(e[t]) : v.none()),
    ue = (e, t) => se.call(e, t)
  'undefined' != typeof window ? window : Function('return this;')()
  const de = (e) => (t) => ((e) => e.dom.nodeType)(t) === e,
    ge = de(3),
    he = de(9),
    fe = de(11),
    pe = (e, t, r) => {
      ;((e, t, r) => {
        if (!(i(r) || l(r) || d(r)))
          throw (
            (console.error(
              'Invalid call to Attribute.set. Key ',
              t,
              ':: Value ',
              r,
              ':: Element ',
              e
            ),
            new Error('Attribute value was not simple'))
          )
        e.setAttribute(t, r + '')
      })(e.dom, t, r)
    },
    ve = (e, t) => {
      const r = e.dom.getAttribute(t)
      return null === r ? void 0 : r
    },
    be = (e, t) => {
      e.dom.removeAttribute(t)
    },
    ye = (e, t) => {
      const r = ve(e, t)
      return void 0 === r || '' === r ? [] : r.split(' ')
    },
    Se = (e) => void 0 !== e.dom.classList,
    we = (e) => ye(e, 'class'),
    xe = (e, t) => {
      Se(e)
        ? e.dom.classList.remove(t)
        : ((e, t) => {
            ;((e, t, r) => {
              const o = k(ye(e, t), (e) => e !== r)
              o.length > 0 ? pe(e, t, o.join(' ')) : be(e, t)
            })(e, 'class', t)
          })(e, t),
        ((e) => {
          0 === (Se(e) ? e.dom.classList : we(e)).length && be(e, 'class')
        })(e)
    },
    ke = (e) => {
      if (null == e) throw new Error('Node cannot be null or undefined')
      return {
        dom: e,
      }
    },
    Ae = ke,
    Oe = (e, t) => {
      e.dispatch('FormatPainterToggle', {
        state: t,
      })
    }
  var Ce, Le, Re, Te
  !(function (e) {
    ;(e.Retrival = 'Retrieval'), (e.Application = 'Application')
  })(Ce || (Ce = {})),
    (function (e) {
      ;(e.ListSchema = 'ListSchema'),
        (e.SubstitutionSchema = 'SubstitionSchema')
    })(Le || (Le = {})),
    (function (e) {
      ;(e.InsertUnorderedList = 'InsertUnorderedList'),
        (e.InsertOrderedList = 'InsertOrderedList'),
        (e.InsertDefinitionList = 'InsertDefinitionList')
    })(Re || (Re = {})),
    (function (e) {
      ;(e.Table = 'Table'), (e.Unspecified = 'Unspecified')
    })(Te || (Te = {}))
  const _e = (e) => {
      var t, r
      ;(t = Ae(e.getBody())),
        (r = 'tox-cursor-format-painter'),
        Se(t)
          ? t.dom.classList.add(r)
          : ((e, t) => {
              ;((e, t, r) => {
                const o = ye(e, t).concat([r])
                pe(e, t, o.join(' '))
              })(e, 'class', t)
            })(t, r)
    },
    Pe = (e, t) => {
      ;((e) => {
        xe(Ae(e.getBody()), 'tox-cursor-format-painter')
      })(e),
        t.set(Ce.Retrival),
        Oe(e, !1)
    },
    Fe = (e, t) => e.dom === t.dom,
    Ee = (e, t) => {
      const r = e.dom
      if (1 !== r.nodeType) return !1
      {
        const e = r
        if (void 0 !== e.matches) return e.matches(t)
        if (void 0 !== e.msMatchesSelector) return e.msMatchesSelector(t)
        if (void 0 !== e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t)
        if (void 0 !== e.mozMatchesSelector) return e.mozMatchesSelector(t)
        throw new Error('Browser lacks native selectors')
      }
    },
    Ne =
      u(Element.prototype.attachShadow) && u(Node.prototype.getRootNode)
        ? (e) => Ae(e.dom.getRootNode())
        : (e) => (he(e) ? e : Ae(e.dom.ownerDocument)),
    Be = (e) => Ae(e.dom.host),
    De = (e) => {
      const t = ge(e) ? e.dom.parentNode : e.dom
      if (null == t || null === t.ownerDocument) return !1
      const r = t.ownerDocument
      return ((e) => {
        const t = Ne(e)
        return fe((r = t)) && m(r.dom.host) ? v.some(t) : v.none()
        var r
      })(Ae(t)).fold(
        () => r.body.contains(t),
        ((o = De), (n = Be), (e) => o(n(e)))
      )
      var o, n
    },
    Ie = (e, t, r) => {
      let o = e.dom
      const n = u(r) ? r : f
      for (; o.parentNode; ) {
        o = o.parentNode
        const e = Ae(o)
        if (t(e)) return v.some(e)
        if (n(e)) break
      }
      return v.none()
    },
    je = (e, t, r) =>
      ((e, t, r, o, n) =>
        o(r) ? v.some(r) : u(n) && n(r) ? v.none() : t(r, o, n))(
        0,
        Ie,
        e,
        t,
        r
      ),
    Me = {
      formatpainter_checklist: {
        selector: 'ul',
        classes: 'tox-checklist',
      },
      formatpainter_liststyletype: {
        selector: 'ul,ol',
        styles: {
          listStyleType: '%value',
        },
      },
      formatpainter_borderstyle: {
        selector: 'td,th',
        styles: {
          borderTopStyle: '%valueTop',
          borderRightStyle: '%valueRight',
          borderBottomStyle: '%valueBottom',
          borderLeftStyle: '%valueLeft',
        },
        remove_similar: !0,
      },
      formatpainter_bordercolor: {
        selector: 'td,th',
        styles: {
          borderTopColor: '%valueTop',
          borderRightColor: '%valueRight',
          borderBottomColor: '%valueBottom',
          borderLeftColor: '%valueLeft',
        },
        remove_similar: !0,
      },
      formatpainter_backgroundcolor: {
        selector: 'td,th',
        styles: {
          backgroundColor: '%value',
        },
        remove_similar: !0,
      },
      formatpainter_removeformat: [
        {
          selector:
            'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
          remove: 'all',
          split: !0,
          expand: !1,
          block_expand: !0,
          deep: !0,
        },
        {
          selector: 'span',
          attributes: ['style', 'class'],
          remove: 'empty',
          split: !0,
          expand: !1,
          deep: !0,
        },
        {
          selector: '*:not(tr,td,th,table)',
          attributes: ['style', 'class'],
          split: !1,
          expand: !1,
          deep: !0,
        },
      ],
      formatpainter_legacy_font: {
        inline: 'font',
        attributes: {
          size: '%value',
        },
      },
    },
    Ve = (e, t) =>
      me(t, 'selector').exists((t) => {
        const r = e.getBody(),
          o = e.selection.getStart(),
          n = e.dom.getParents(o, p, r),
          s = e.selection.getSelectedBlocks()
        return e.dom.is([...n, ...s], t)
      }),
    Ue = (e) => e.length > 1 && '%' === e.charAt(0),
    We = (e, t) => me(e, t).filter((e) => !c(e)),
    $e = (e) => Ee(e, 'OL,UL,DL'),
    qe = (e) => Ee(e, 'LI,DT,DD'),
    ze = (e) => e.replace(/([A-Z])/g, (e) => `-${e[0].toLowerCase()}`),
    Ke = (e, t, r) => {
      const o = e.formatter,
        n = ((e, t) =>
          w(e.formatter.get(t), (t) =>
            ((e, t) => ue(t, 'inline') && !Ve(e, t))(e, t)
          ))(e, r.formatName),
        s = ((e, t, r) =>
          w(t.get(r), (t) => ((e, t) => ue(t, 'block') || Ve(e, t))(e, t)))(
          e,
          o,
          r.formatName
        ),
        a =
          ((i = r.formatName),
          S(
            [
              'formatpainter_borderstyle',
              'formatpainter_bordercolor',
              'formatpainter_backgroundcolor',
            ],
            i
          ))
      var i
      ;((t.table && a) || (t.inline && n) || (t.block && s && !a)) &&
        o.apply(r.formatName, r.substitutedVariables)
    },
    Ze = (e) => {
      const t = e.selection,
        r = t.getRng(),
        o = Ae(e.getBody()),
        n = ((e) => k(e.selection.getSelectedBlocks().map(Ae), qe))(e),
        s = r.collapsed && n.length,
        a =
          n.length &&
          !((e, t) => {
            const r = (e) => Fe(e, t)
            return ((o = je(Ae(e.getStart()), $e, r)),
            (n = je(Ae(e.getEnd()), $e, r)),
            (s = (e, t) => Fe(e, t)),
            o.isSome() && n.isSome()
              ? v.some(s(o.getOrDie(), n.getOrDie()))
              : v.none()).getOr(!1)
            var o, n, s
          })(t, o)
      return n.length > 1 || s || a
    },
    Ge = (e, t) => {
      const r = e.dom,
        o = window.getComputedStyle(r).getPropertyValue(t)
      return '' !== o || De(e) ? o : He(r, t)
    },
    He = (e, t) =>
      ((e) => void 0 !== e.style && u(e.style.getPropertyValue))(e)
        ? e.style.getPropertyValue(t)
        : '',
    Je =
      ('formatpainter_ignored_formats',
      (e) => e.options.get('formatpainter_ignored_formats'))
  const Qe = (e, t) => {
      return 'class' === t
        ? ((e) =>
            Se(e)
              ? ((e) => {
                  const t = e.dom.classList,
                    r = new Array(t.length)
                  for (let e = 0; e < t.length; e++) {
                    const o = t.item(e)
                    null !== o && (r[e] = o)
                  }
                  return r
                })(e)
              : we(e))(e)
            .filter((e) => !/^(mce-.*)/.test(e))
            .join(' ')
        : ((r = e), (o = t), v.from(ve(r, o))).getOr('')
      var r, o
    },
    Xe = (e) =>
      ((e, t) => {
        const r = {},
          o = {}
        return (
          ((e, t, r, o) => {
            ae(e, (e, n) => {
              ;(t(e, n) ? r : o)(e, n)
            })
          })(e, t, ce(r), ce(o)),
          {
            t: r,
            f: o,
          }
        )
      })(e, (e) => {
        return (t = e).length > 1 && '%' === t.charAt(0)
        var t
      }).t,
    Ye = (e, t) =>
      ((e) => {
        const t = Je(e)
        return ne(e.formatter.get()).filter((e) => !S(t, e))
      })(e).filter((r) => {
        const o = ((e, t) =>
          w(e.formatter.get(t), (e) =>
            ((e) => {
              const t = We(e, 'styles').exists((e) => w(le(e), Ue)),
                r = We(e, 'attributes').exists((e) => w(le(e), Ue))
              return t || r
            })(e)
          ))(e, r)
        return e.formatter.matchNode(t.dom, r, {}, o)
      }),
    et = (e, t) => {
      const r = e.dom.getParents(t, p)
      return O(x(r, Ae), (t) =>
        O(Ye(e, t), (r) =>
          ((e, t, r) => {
            return ((o = e.get(t)),
            ((e, t) => (0 < e.length ? v.some(e[0]) : v.none()))(o))
              .bind((e) =>
                ((e, t) => {
                  const r = We(e, 'styles').map((e) => {
                      return (
                        (r = t),
                        (o = Xe(e)),
                        ie(o, (e, t) => ({
                          k: e.slice(1, e.length),
                          v: Ge(r, ze(t)),
                        }))
                      )
                      var r, o
                    }),
                    o = We(e, 'attributes').map((e) => {
                      return (
                        (r = t),
                        (o = Xe(e)),
                        ie(o, (e, t) => ({
                          k: e.slice(1, e.length),
                          v: Qe(r, t),
                        }))
                      )
                      var r, o
                    }),
                    n = { ...r.getOr({}), ...o.getOr({}) }
                  return le(n).every((e) => '' !== e) ? v.some(n) : v.none()
                })(e, r)
              )
              .map((e) => ({
                kind: Le.SubstitutionSchema,
                formatName: t,
                substitutedVariables: e,
              }))
            var o
          })(e.formatter, r, t).toArray()
        )
      )
    },
    tt = (e) =>
      ((e) => A(le(Re), (t) => e.queryCommandState(t)))(e).map((e) => ({
        kind: Le.ListSchema,
        command: e,
      })),
    rt = (e, t) => (e.getParent(t, 'TABLE') ? Te.Table : Te.Unspecified),
    ot = (t, r, o) => {
      t.addCommand('mceToggleFormatPainter', () => {
        ;((t, r) => {
          r.get() === Ce.Application
            ? Pe(t, r)
            : ((t, r) => {
                const o = oe(),
                  n = e(!1)
                _e(t),
                  r.set(Ce.Application),
                  Oe(t, !0),
                  t.execCommand('mceRetrieveFormats')
                const s = () => {
                    t.execCommand('mcePaintFormats'), Pe(t, r)
                  },
                  a = () => {
                    r.get() === Ce.Application && s(), m()
                  },
                  i = (e) => {
                    r.get() === Ce.Application &&
                      ('touchcancel' === e.type && o.os.isAndroid()
                        ? t.once('contextmenu', s)
                        : n.get()
                        ? s()
                        : t.once('selectionchange', s)),
                      m()
                  },
                  c = (e) => {
                    27 === e.keyCode && (Pe(t, r), m())
                  },
                  l = (e) => {
                    n.set('touchmove' === e.type)
                  }
                t.on('click', a),
                  t.on('touchstart touchmove', l),
                  t.on('touchend touchcancel', i),
                  t.on('keydown', c)
                const m = () => {
                  t.off('click', a),
                    t.off('touchstart touchmove', l),
                    t.off('touchend touchcancel', i),
                    t.off('keydown', c)
                }
              })(t, r)
        })(t, r)
      }),
        t.addCommand('mcePaintFormats', () => {
          t.undoManager.transact(() => {
            ;((e, t) => {
              ;((e, t) => {
                e.formatter.remove('formatpainter_removeformat'),
                  t === Te.Table &&
                    ((t, r) => {
                      for (let r = 0, n = t.length; r < n; r++)
                        (o = t[r]), e.formatter.remove(o)
                      var o
                    })([
                      'formatpainter_borderstyle',
                      'formatpainter_bordercolor',
                      'formatpainter_backgroundcolor',
                    ]),
                  Ze(e) && e.execCommand('RemoveList')
              })(e, t.context)
              const r = ((e) => {
                const t = e.selection.getStart(),
                  r = e.selection.getRng().collapsed,
                  o = e.dom.select('td[data-mce-selected]').length > 0,
                  n = !!e.dom.getParent(t, 'TABLE')
                return {
                  inline: !0,
                  table: (r && n) || o,
                  block:
                    r ||
                    ((s = e.selection), s.getSelectedBlocks().length > 1) ||
                    o,
                }
                var s
              })(e)
              t.schemas.forEach((t) => {
                switch (t.kind) {
                  case Le.ListSchema:
                    ;((e, t, r) => {
                      r.block && e.execCommand(t.command)
                    })(e, t, r)
                    break
                  case Le.SubstitutionSchema:
                    Ke(e, r, t)
                }
              })
            })(t, o.get())
          })
        }),
        t.addCommand('mceRetrieveFormats', () => {
          o.set(
            ((e) => {
              const t = e.dom,
                r = e.selection.getStart()
              return {
                schemas: [...tt(e).toArray(), ...et(e, r)],
                context: rt(t, r),
              }
            })(t)
          )
        })
    }
  tinymce.PluginManager.add('formatpainter', (t) => {
    if (
      ((e, t) =>
        !!e &&
        -1 ===
          ((e, t) => {
            const o = r(e.major, t.major)
            if (0 !== o) return o
            const n = r(e.minor, t.minor)
            if (0 !== n) return n
            const s = r(e.patch, t.patch)
            return 0 !== s ? s : 0
          })(
            ((e) =>
              n(
                ((e) =>
                  [e.majorVersion, e.minorVersion]
                    .join('.')
                    .split('.')
                    .slice(0, 3)
                    .join('.'))(e)
              ))(e),
            n(t)
          ))(tinymce, '6.0.0')
    )
      return void window.console.error(
        'The format painter plugin requires at least version 6.0.0 of TinyMCE.'
      )
    const o = e(Ce.Retrival),
      s = e({
        schemas: [],
        context: Te.Unspecified,
      })
    ;((e) => {
      ;(0, e.options.register)('formatpainter_ignored_formats', {
        processor: 'string[]',
        default: 'link,address,removeformat,formatpainter_removeformat'.split(
          ','
        ),
      })
    })(t),
      ((e) => {
        e.on('PreInit', () => {
          ae(Me, (t, r) => {
            e.formatter.get(r) || e.formatter.register(r, t)
          })
        })
      })(t),
      ot(t, o, s),
      ((e) => {
        e.ui.registry.addToggleButton('formatpainter', {
          active: !1,
          icon: 'format-painter',
          tooltip: 'Format painter',
          onAction: () => e.execCommand('mceToggleFormatPainter'),
          onSetup: (t) => {
            const r = (e) => {
              t.setActive(e.state)
            }
            return (
              e.on('FormatPainterToggle', r),
              () => e.off('FormatPainterToggle', r)
            )
          },
        })
      })(t),
      ((e, t) => {
        e.ui.registry.addToggleMenuItem('formatpainter', {
          active: !1,
          icon: 'format-painter',
          text: 'Format painter',
          onAction: () => e.execCommand('mceToggleFormatPainter'),
          onSetup: (r) => {
            const o = (e) => {
              r.setActive(e.state)
            }
            return (
              r.setActive(t.get() === Ce.Application),
              e.on('FormatPainterToggle', o),
              () => e.off('FormatPainterToggle', o)
            )
          },
        })
      })(t, o),
      ((e) => {
        e.addShortcut('Meta+alt+C', '', () => {
          e.execCommand('mceRetrieveFormats')
        }),
          e.addShortcut('Meta+alt+V', '', () => {
            e.execCommand('mcePaintFormats')
          })
      })(t)
  })
})()
