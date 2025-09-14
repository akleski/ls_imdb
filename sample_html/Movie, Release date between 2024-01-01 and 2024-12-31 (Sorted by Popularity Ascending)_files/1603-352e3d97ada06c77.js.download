"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1603],{94475:function(e,t,a){a.d(t,{G:function(){return d}});var i=a(52322),r=a(72779),o=a.n(r),s=a(2784),n=a(19596),l=a(88169),c=a(86704);let d=e=>{let{palette:{baseColor:t}}=(0,s.useContext)(l.ThemeContext),{title:a,message:r,className:n,action:c,displayType:d}=e;return(0,i.jsx)(m,{className:o()(n,t),baseColor:"none",children:(0,i.jsxs)("div",{className:"inner",children:[(0,i.jsx)("div",{className:"title",role:"alert",children:a}),!!e.message&&(0,i.jsx)("div",{className:"message",role:"alert",children:r}),!!c&&(0,i.jsx)("compact"===d?g:p,{children:c})]})})},g=n.ZP.div.withConfig({componentId:"sc-46b1addd-0"})(["margin-top:",";"],c.spacing.s),p=n.ZP.div.withConfig({componentId:"sc-46b1addd-1"})(["margin-top:",";"],c.spacing.l),m=(0,n.ZP)(l.PageSection).withConfig({componentId:"sc-46b1addd-2"})([".inner{max-width:480px;margin:0 auto;text-align:center;}.message{margin-top:",";}&.base{.title{",";}.message{",";}}&.baseColor{.title{",";}.message{",";}}"],c.spacing.m,(0,c.setPropertyToColorVar)("color","ipt-on-base-textPrimary-color"),(0,c.setPropertyToColorVar)("color","ipt-on-base-textSecondary-color"),(0,c.setPropertyToColorVar)("color","ipt-on-baseAlt-textPrimary-color"),(0,c.setPropertyToColorVar)("color","ipt-on-baseAlt-textSecondary-color"))},64072:function(e,t,a){a.d(t,{w:function(){return o}});var i=a(30382),r=a.n(i);let o=r()`
    fragment ImageListItemMetadata on Image {
        id
        url
        height
        width
        caption {
            plainText
        }
        names(limit: 4) {
            id
            nameText {
                text
            }
        }
        titles(limit: 1) {
            id
            titleText {
                text
            }
            originalTitleText {
                text
            }
            releaseYear {
                year
                endYear
            }
        }
    }
`},88758:function(e,t,a){a.d(t,{E:function(){return o},k:function(){return s}});var i=a(30382),r=a.n(i);let o=r()`
    fragment NameListItemMetadata on Name {
        id
        primaryImage {
            url
            caption {
                plainText
            }
            width
            height
        }
        nameText {
            text
        }
        primaryProfessions {
            category {
                text
            }
        }
        # IMDB_WEB_PACE_SPECIFIC_PROFESSIONS_DISPLAY_1112523
        professions {
            profession {
                text
            }
        }
        knownForV2(limit: 1) @include(if: $isInPace) {
            credits {
                title {
                    id
                    originalTitleText {
                        text
                    }
                    titleText {
                        text
                    }
                    titleType {
                        canHaveEpisodes
                    }
                    releaseYear {
                        year
                        endYear
                    }
                }
                episodeCredits(first: 0) {
                    yearRange {
                        year
                        endYear
                    }
                }
            }
        }
        knownFor(first: 1) {
            edges {
                node {
                    summary {
                        yearRange {
                            year
                            endYear
                        }
                    }
                    title {
                        id
                        originalTitleText {
                            text
                        }
                        titleText {
                            text
                        }
                        titleType {
                            canHaveEpisodes
                        }
                    }
                }
            }
        }
        bio {
            displayableArticle {
                body {
                    plaidHtml(
                        queryParams: $refTagQueryParam
                        showOriginalTitleText: $originalTitleText
                    )
                }
            }
        }
    }
`,s=r()`
    fragment NameMeterRanking on Name {
        meterRanking {
            currentRank
            rankChange {
                changeDirection
                difference
            }
        }
    }
`},36543:function(e,t,a){a.d(t,{$z:function(){return l},Dl:function(){return s},Zz:function(){return c},_A:function(){return d},f1:function(){return g},qp:function(){return p},vO:function(){return n}});var i=a(30382),r=a.n(i),o=a(85018);let s=r()`
    fragment TitleTopCastAndCrew on Title {
        id
        principalCredits(
            filter: { categories: ["cast", "director", "creator"] }
        ) {
            category {
                id
                text
            }
            credits {
                name {
                    id
                    nameText {
                        text
                    }
                }
            }
        }
        principalCreditsV2(filter: { mode: "NARROWED" }, useEntitlement: false)
            @include(if: $isInPace) {
            grouping {
                groupingId
                text
            }
            credits(limit: 4) {
                name {
                    id
                    nameText {
                        text
                    }
                }
            }
        }
    }
`,n=r()`
    fragment TitleMeterRanking on Title {
        meterRanking {
            currentRank
            rankChange {
                changeDirection
                difference
            }
        }
    }
`,l=r()`
    fragment TitleListItemMetadataEssentials on Title {
        ...BaseTitleCard
        series {
            series {
                id
                originalTitleText {
                    text
                }
                releaseYear {
                    endYear
                    year
                }
                titleText {
                    text
                }
            }
        }
    }
    ${o.sq}
`,c=r()`
    fragment TitleListItemMetadata on Title {
        ...TitleListItemMetadataEssentials
        latestTrailer {
            id
        }
        plot {
            plotText {
                plainText
            }
        }
        releaseDate {
            day
            month
            year
        }
        productionStatus(useEntitlement: false) {
            currentProductionStage {
                id
                text
            }
        }
    }
    ${l}
`,d=r()`
    fragment TitleListItemMetascore on Title {
        metacritic {
            metascore {
                score
            }
        }
    }
`,g=r()`
    fragment TitleTotalEpisodes on Title {
        episodes {
            episodes(first: 0) {
                total
            }
        }
    }
`,p=r()`
    fragment TitleListFacetFields on TitleListItemSearchConnection {
        genres: facet(facetField: GENRES) {
            filterId
            text
            total
        }

        keywords: facet(facetField: KEYWORDS) {
            filterId
            text
            total
        }

        watchOptions: facet(facetField: WATCH_PROVIDERS) {
            filterId
            text
            total
        }

        titleTypes: facet(facetField: TITLE_TYPE) {
            filterId
            text
            total
        }
    }
`},97149:function(e,t,a){a.d(t,{X:function(){return o}});var i=a(30382),r=a.n(i);let o=r()`
    fragment VideoListItemMetadata on Video {
        id
        thumbnail {
            url
            width
            height
        }
        name {
            value
            language
        }
        description {
            value
            language
        }
        runtime {
            unit
            value
        }
        primaryTitle {
            id
            originalTitleText {
                text
            }
            titleText {
                text
            }
            titleType {
                canHaveEpisodes
            }
            releaseYear {
                year
                endYear
            }
        }
    }
`},14342:function(e,t,a){a.d(t,{_q:function(){return E},ZP:function(){return P}});var i=a(52322),r=a(27722),o=a(72779),s=a.n(o),n=a(2784),l=a(9162),c=a(53665),d=a(19596),g=a(11438),p=a(14438);let m={CREDIT_CHANGE:g.Cd.FILMOGRAPHY,"CONTACT_CHANGE|CONTACT__RELATIONSHIP_TYPE|REPRESENTATION":g.Cd.REPRESENTATION,EMPLOYMENT_CHANGE:g.Cd.EMPLOYMENT,"CONTACT_CHANGE|CONTACT__RELATIONSHIP_TYPE|CLIENT":g.Cd.CLIENTS,NEWS_ADDITION:g.Cd.NEWS},T={TRACK:{id:"pro_name_page_shared_connections_track",defaultMessage:"Track"},TRACKING:{id:"pro_name_page_shared_connections_tracking",defaultMessage:"Tracking"},IS_LOADING:{id:"common_ariaLabel_loading",defaultMessage:"Loading"}};var u=a(17503),f=a(11602);let C=()=>{let[e,t]=(0,u.Z)(f.Vc),a=async e=>t(e);return{success:e.data?.untrackConst?.success,error:e.error,fetching:e.fetching,updateUntrackingForConst:a}},I=()=>{let[e,t]=(0,u.Z)(f.qb),a=async e=>t(e);return{success:e.data?.trackConst?.success,error:e.error,fetching:e.fetching,updateTrackingForConst:a}},h=e=>{let t=(0,c.Z)(),[a,i]=(0,n.useState)(e),[r,o]=(0,n.useState)(!1),{updateTrackingForConst:s}=I(),{updateUntrackingForConst:l}=C(),d=async e=>{if(!1===e.isTracking&&!1!==a.isTracking){o(!0);let e=await l({input:{id:a.id}}),t={...a,isTracking:!1};e.data?.untrackConst?.success&&i(t),o(!1)}else if(!0===e.isTracking&&!1===a.isTracking){o(!0);let e=a.notificationPreferences?.map(e=>({...e,interested:!0})),t=await s({input:{id:a.id,notificationTypeStates:e?.map(e=>{let{interested:t,type:a}=e;return{typeId:a.typeId,interested:t}})}});t.data?.trackConst?.success&&i({...a,isTracking:!0,notificationPreferences:e}),o(!1)}else if(!0===e.isTracking&&e.notificationPreferences!==a.notificationPreferences){o(!0);let t={...a,isTracking:!0,notificationPreferences:a.notificationPreferences?.map(t=>{let a=t;return e.notificationPreferences?.map(e=>{e.type.typeId===t.type.typeId&&e.interested!==t.interested&&(a=e)}),a})},r=await s({input:{id:a.id,notificationTypeStates:t.notificationPreferences?.map(e=>({typeId:e.type.typeId,interested:e.interested}))}});r.data?.trackConst?.success&&i(t),o(!1)}},g=t.formatMessage(T.IS_LOADING),p=a.isTracking?t.formatMessage(T.TRACKING):t.formatMessage(T.TRACK);return{state:a,updateTracking:d,isFetching:r,ariaLabel:r?g:p}},x={TRACK:{id:"pro_name_page_shared_connections_track",defaultMessage:"Track"},TRACKING:{id:"pro_name_page_shared_connections_tracking",defaultMessage:"Tracking"},STOP_TRACKING:{id:"pro_name_page_shared_connections_stop_tracking",defaultMessage:"Stop tracking"}},b={track:"track",trackButton:"track-on",trackMenu:"track-menu-open"},E="protrackbutton--tracking--post-icon",_=e=>{let t,{id:a,data:o,buttonProps:d,buttonType:T="button",displayTrackOptionsMenu:u=!0,className:f}=e,C=(0,c.Z)(),I=(0,p.EO)(),{state:{isTracking:_,notificationPreferences:P},updateTracking:M,isFetching:N}=h({id:a,isTracking:o?.isTracking||!1,notificationPreferences:o?.notificationPreferences||[]}),[A,S]=(0,n.useState)(!1),R={className:s()(d?.className,u?void 0:f),onColor:void 0};switch(T){case"secondaryButton":t=r.SecondaryButton,R.onColor="accent2";break;case"textButton":t=r.TextButton,R.onColor="accent2";break;default:t=r.Button}let v={},O=u?L:n.Fragment;u&&(v.className=f);let $=()=>I({pageAction:`${b.trackButton}-${a}`,refMarkerSuffix:g.Cd.EMPTY}),V=()=>I({pageAction:b.trackMenu,refMarkerSuffix:g.Cd.EMPTY}),w=()=>I({pageAction:`${b.track}-${g.Cd.OFF}-${a}`,refMarkerSuffix:g.Cd.MENU}),j=(e,t)=>{let a=m[e],i=t?g.Cd.OFF:g.Cd.ON;I({pageAction:`${a}-${i}`,refMarkerSuffix:g.Cd.MENU})};return(0,i.jsxs)(O,{...v,children:[!!N&&(0,i.jsx)(t,{...d,...R,children:(0,i.jsx)(r.Loader,{})}),!N&&(0,i.jsx)(t,{onSelect:()=>{_?(V(),u?S(!A):M({isTracking:!1})):($(),M({isTracking:!0}))},preIcon:_?"notifications-add-check":"notifications-add",postIcon:_&&u?"arrow":void 0,postIconClassName:_&&u?E:void 0,...d,...R,children:_?C.formatMessage(x.TRACKING):C.formatMessage(x.TRACK)}),!!_&&!!u&&(0,i.jsx)(r.SetPalette,{palette:"light",children:(0,i.jsx)(k,{isVisible:A,mode:"absolute",expandFrom:"top-right",children:(0,i.jsx)(l.Y,{onEscapeKey:()=>S(!1),onClickOutside:()=>S(!1),children:(0,i.jsxs)(r.MenuList,{children:[P?.map(e=>{let{type:t,interested:a}=e;return i.jsx(y,{onClick:()=>{j(t.typeId,a),M({isTracking:!0,notificationPreferences:[{interested:!a,type:t}]})},preIconName:a?"checkbox-checked":"checkbox-unchecked",preIconProps:{name:a?"checkbox-checked":"checkbox-unchecked",spanClassName:"checkbox-icon"},children:t.text},t.text)}),(0,i.jsx)(r.MenuListDivider,{}),(0,i.jsx)(r.MenuListItem,{onClick:()=>{w(),S(!1),M({isTracking:!1})},children:C.formatMessage(x.STOP_TRACKING)})]})})})})]})};var P=e=>(0,i.jsx)(g.xm,{value:g.Cd.TRACK,children:(0,i.jsx)(_,{...e})});let L=d.ZP.div.withConfig({componentId:"sc-3c01a4e4-0"})(["position:relative;"]),y=(0,d.ZP)(r.MenuListItem).withConfig({componentId:"sc-3c01a4e4-1"})([".checkbox-icon{","}"],(0,r.setPropertyToColorVar)("color","ipt-on-base-accent2-color")),k=(0,d.ZP)(r.Menu).withConfig({componentId:"sc-3c01a4e4-2"})(["right:0;top:100%;"])},96557:function(e,t,a){a.d(t,{Z:function(){return Q}});var i=a(52322),r=a(14973),o=a(30382),s=a.n(o),n=a(2784),l=a(53665),c=a(19596),d=a(88169),g=a(86704),p=a(31885),m=a(20608),T=a(84314),u=a(49666),f=a(49996),C=a(4363),I=a(66724),h=a(11438),x=a(37179),b=a(6935),E=a(14438),_=a(1833),P=a(94475),L=a(67353),y=a(22619),k=a(25436),M=a(75824),N=a(75808);let A=s()`
    fragment AddConstToListMenuItem on List {
        id
        name {
            originalText
        }
    }
`,S=e=>{let{value:t}=(0,h.Lz)(),{listMainLinkBuilder:a}=(0,I.WOb)(),{palette:{baseColor:r}}=(0,n.useContext)(d.ThemeContext),{constId:o,onError:s}=e,{pageType:l}=(0,f.y)(),c=(0,u.ik)()&&l===k.PageType.NAME,g=e.listData.id,p=e.listData.name?.originalText||"",m=(0,M.N)({id:"addConstToListMenuItem_goToList_ariaLabel",defaultMessage:"Go to list: {listTitle}"},{listTitle:p}),T=(0,M.N)({id:"user_your_checkins",defaultMessage:"Your Check-Ins"}),[C,x]=(0,n.useState)(e.isElementInList),{addConstToList:b,removeConstFromList:E}=(0,N.j8)({overrideRefTag:c?t+`_${g}`:t}),{addToWatchedTitles:_}=(0,y.V)(),{executeAddConstToList:P,addConstToListResult:A}=b,{executeRemoveConstFromList:S,removeConstFromListResult:R}=E,v=A?.error||R?.error,D=()=>{C?(S(g,o),x(!1)):(P(g,o),x(!0),"CHECK_INS"===e.listClass&&_(o))};return v?(s(v),null):(0,i.jsxs)(O,{children:[(0,i.jsxs)($,{onClick:D,onKeyDown:e=>{(0,L.isEnterOrSpaceKey)(e)&&D()},role:"button",tabIndex:0,"data-titleinlist":C,className:r,children:[!!C&&(0,i.jsx)(w,{name:"playlist-add-check",className:r}),!C&&(0,i.jsx)(V,{name:"add"}),"CHECK_INS"===e.listClass?T:p]}),(0,i.jsx)(j,{href:a({lsconst:g,refSuffix:h.Cd.EMPTY}),"aria-label":m,className:r,children:(0,i.jsx)(d.Icon,{name:"chevron-right"})})]})};S.fragments={addConstToListMenuItem:A};let R=`
    &:focus {
        ${(0,g.focusOnBaseAlt)()}
    }

    &:hover {
        background: rgba(
            ${(0,g.getColorVarValue)("ipt-on-baseAlt-rgb")},
            ${(0,g.getColorVarValue)("ipt-baseAlt-hover-opacity")}
        );
        background: rgba(
            ${(0,g.getColorVar)("ipt-on-baseAlt-rgb")},
            ${(0,g.getColorVar)("ipt-baseAlt-hover-opacity")}
        );
    }

    &:active {
        background: rgba(
            ${(0,g.getColorVarValue)("ipt-on-baseAlt-rgb")},
            ${(0,g.getColorVarValue)("ipt-baseAlt-pressed-opacity")}
        );
        background: rgba(
            ${(0,g.getColorVar)("ipt-on-baseAlt-rgb")},
            ${(0,g.getColorVar)("ipt-baseAlt-pressed-opacity")}
        );
    }
`,v=`
    &:focus {
        ${(0,g.focusOnBase)()}
    }

    &:hover {
        background: rgba(
            ${(0,g.getColorVarValue)("ipt-on-base-rgb")},
            ${(0,g.getColorVarValue)("ipt-base-hover-opacity")}
        );
        background: rgba(
            ${(0,g.getColorVar)("ipt-on-base-rgb")},
            ${(0,g.getColorVar)("ipt-base-hover-opacity")}
        );
    }

    &:active {
        background: rgba(
            ${(0,g.getColorVarValue)("ipt-on-base-rgb")},
            ${(0,g.getColorVarValue)("ipt-base-pressed-opacity")}
        );
        background: rgba(
            ${(0,g.getColorVar)("ipt-on-base-rgb")},
            ${(0,g.getColorVar)("ipt-base-pressed-opacity")}
        );
    }
`,O=c.ZP.div.withConfig({componentId:"sc-ad2b51b3-0"})(["display:flex;align-items:center;width:100%;"]),$=c.ZP.div.withConfig({componentId:"sc-ad2b51b3-1"})(["flex-grow:1;cursor:pointer;padding:0.75rem 1rem 0.75rem 0.75rem;position:relative;text-overflow:ellipsis;overflow:hidden;word-break:break-all;white-space:nowrap;&::after{position:absolute;content:'';right:0;top:20%;height:60%;width:1px;}&.base::after{","}&.baseAlt::after{","}"],(0,g.setPropertyToColorVar)("background-color","ipt-base-border-color"),(0,g.setPropertyToColorVar)("background-color","ipt-baseAlt-border-color")),V=(0,c.ZP)(d.Icon).withConfig({componentId:"sc-ad2b51b3-2"})(["margin-right:0.5rem;"]),w=(0,c.ZP)(V).withConfig({componentId:"sc-ad2b51b3-3"})(["&.base{","}&.baseAlt{","}"],(0,g.setPropertyToColorVar)("color","ipt-on-base-accent4-color"),(0,g.setPropertyToColorVar)("color","ipt-on-baseAlt-accent4-color")),j=c.ZP.a.withConfig({componentId:"sc-ad2b51b3-4"})(["padding:0.75rem 1rem;flex-shrink:0;&.base{"," ","}&.baseAlt{"," ","}"],(0,g.setPropertyToColorVar)("color","ipt-on-base-textHint-color"),v,(0,g.setPropertyToColorVar)("color","ipt-on-baseAlt-textHint-color"),R),D={PROMPT_TITLE:{id:"common_add_to_list_buttonText",defaultMessage:"Add to list"},CREATE_LIST:{id:"addConstToListPrompt_label_createList",defaultMessage:"Create new list"},ERROR_TITLE:{id:"error_emptyStates_addConstToList_title",defaultMessage:"There was a problem. Please try again."},VIEW_WATCHLIST:{id:"common_label_viewWatchlist",defaultMessage:"View Watchlist"},SIGNED_OUT_ERROR_TITLE:{id:"error_signedOut_addConstToList_title",defaultMessage:"Sign in to create or view a list."},CLOSE_PROMPT_LABEL:{id:"common_ariaLabel_closePrompt",defaultMessage:"Close Prompt"},NO_LISTS_FOUND:{id:"addConstToListPrompt_no_lists_found",defaultMessage:"No lists found"}},Z={LOADER:"actlp-loader",ERROR:"actlp-error",CREATE_LIST:"actlp-creat-list",VIEW_WATCHLIST:"actlp-watchlist",NO_LIST:"actlp-no-list"},F="addConstToListPrompt__panel",W=s()`
    query ACTLP_Prompt(
        $count: Int!
        $constId: ID!
        $after: ID
        $listElementType: ListTypeId
        $classTypes: [ListClassId!]
    ) {
        lists(
            first: $count
            filter: {
                listElementType: $listElementType
                classTypes: $classTypes
            }
            after: $after
        ) {
            total
            edges {
                node {
                    ...AddConstToListMenuItem
                    isElementInList(itemElementId: $constId)
                    listClass {
                        id
                    }
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
    ${S.fragments.addConstToListMenuItem}
`,Y={hasNextPage:!0,listItems:[],endCursor:null},H=e=>{let t,a;let{isOpen:o,onClose:s,primaryImage:c,primaryText:g,imageType:P}=e,L=c?.caption?.plainText||"",y=(0,T.n)(),k=(0,u.ik)(),M=(0,l.Z)(),{makeRefMarker:N}=(0,h.Lz)(),{listCreateLinkBuilder:A,listWatchlistLinkBuilder:R,registrationSignInLinkBuilder:v}=(0,I.WOb)(),{pageType:O,pageConst:$}=(0,f.y)(),V=e.constId||$,w=V?.startsWith("tt"),j=V?.startsWith("nm"),H=k?[p.JQJ.ProList]:[p.JQJ.CheckIns,p.JQJ.List],Q=(0,E.EO)(),U="poster";w&&(t=p.lZo.Titles),j&&(t=p.lZo.People,U="avatar");let[z,J]=(0,n.useState)(Y),[X]=(0,C.E)({query:W,requestPolicy:"network-only",variables:{constId:V,count:100,after:z.endCursor,listElementType:t,classTypes:H},context:{serverSideCacheable:!1,personalized:!0},pause:!o||!y||!V}),[ee,et]=(0,n.useState)(void 0),ea=X.fetching,ei=X.error||ee,er=X.data?.lists?.total,eo=O&&V?(0,i.jsx)(d.TextLink,{href:v({refSuffix:[h.Cd.LIST,h.Cd.MENU],query:{u:`/${O}/${V}/`}}),text:M.formatMessage(D.SIGNED_OUT_ERROR_TITLE)}):null,es=M.formatMessage(D.ERROR_TITLE);(0,n.useEffect)(()=>{o&&!ea&&X.data?.lists&&z.hasNextPage&&J({listItems:X.data?.lists?.edges?z.listItems.concat(X.data.lists.edges):z.listItems,hasNextPage:X.data?.lists?.pageInfo?.hasNextPage,endCursor:X.data?.lists?.pageInfo?.endCursor})},[z.hasNextPage,X.data]),(0,n.useEffect)(()=>{if(o){Q({pageAction:x.QJ.ADD_TO_LIST_OPEN,hitType:r.HitType.POP_UP,refMarkerSuffix:h.Cd.EMPTY});return}J({...Y})},[o]);let en=!ei&&o&&y&&er!==z.listItems.length;return(0,i.jsxs)(B,{"data-testid":"styled-list-prompt",isOpen:o,onCloseClicked:()=>{s(),Q({pageAction:x.QJ.ADD_TO_LIST_CLOSE,hitType:r.HitType.POP_UP,refMarkerSuffix:h.Cd.EMPTY})},panelClassName:F,baseColor:k?"base":"baseAlt",header:(0,i.jsx)(G,{type:U,subtitle:g,reverseTitleOrder:!0,title:M.formatMessage(D.PROMPT_TITLE),ariaLabel:L,imageModel:(0,b.K0)(c,L),imageType:P}),closePromptLabel:M.formatMessage(D.CLOSE_PROMPT_LABEL),children:[y?(0,i.jsxs)(d.MenuList,{children:[!!w&&!k&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(d.MenuListItem,{className:Z.VIEW_WATCHLIST,href:R({refSuffix:h.Cd.WATCHLIST}),postIconName:"chevron-right",children:(0,i.jsx)(m.q,{...D.VIEW_WATCHLIST})}),(0,i.jsx)(d.MenuListDivider,{})]}),(0,i.jsx)(d.MenuListItem,{className:Z.CREATE_LIST,href:k?(0,_.Ae)(`${_.Wr}/list/`,N(h.Cd.NEW),{}):A({refSuffix:h.Cd.NEW}),target:k?"_blank":void 0,postIconName:k?"launch":"chevron-right",children:(0,i.jsx)(m.q,{...D.CREATE_LIST})}),(0,i.jsx)(d.MenuListDivider,{}),!!ei&&(0,i.jsx)(K,{className:Z.ERROR,title:(a=ee,a?.graphQLErrors[0]?.extensions?.code==="FORBIDDEN")?eo:es}),!en&&0===z.listItems.length&&(0,i.jsx)(K,{className:Z.NO_LIST,title:(0,i.jsx)(m.q,{...D.NO_LISTS_FOUND})}),!ei&&!!V&&z.listItems.map(e=>(0,i.jsx)(S,{listData:e.node,listClass:e.node?.listClass?.id,isElementInList:e.node.isElementInList||!1,constId:V,onError:et},e.node.id))]}):(0,i.jsx)(K,{className:Z.ERROR,title:eo}),!!en&&(0,i.jsx)(q,{"data-testid":Z.LOADER,children:(0,i.jsx)(d.Loader,{})})]})},B=(0,c.ZP)(d.Prompt).withConfig({componentId:"sc-c36b4240-0"})([".","{padding:0;",";min-height:18rem;}"],F,(0,g.setPropertyToShapeVar)("border-radius","ipt-cornerRadius")),G=(0,c.ZP)(d.PromptHeader).withConfig({componentId:"sc-c36b4240-1"})([""," ",""],(0,g.setPropertyToShapeVar)("border-top-left-radius","ipt-cornerRadius"),(0,g.setPropertyToShapeVar)("border-top-right-radius","ipt-cornerRadius")),K=(0,c.ZP)(P.G).withConfig({componentId:"sc-c36b4240-2"})([""," background:initial;min-height:7rem;padding:3rem;"],(0,g.setTypographyType)("body")),q=c.ZP.div.withConfig({componentId:"sc-c36b4240-3"})(["display:flex;min-height:7rem;justify-content:center;padding:3rem;"]);var Q=e=>(0,i.jsx)(h.xm,{value:h.Cd.LIST,children:(0,i.jsx)(H,{...e})})},75808:function(e,t,a){a.d(t,{j8:function(){return x}});var i=a(30382),r=a.n(i),o=a(64072),s=a(88758),n=a(80032),l=a(36543),c=a(97149),d=a(25436),g=a(48687),p=a(86958),m=a(49666),T=a(11438),u=a(14438),f=a(83163),C=a(17503);let I="list-item-add",h="list-item-delete",x=e=>{let[t,a]=(0,C.Z)(b),[i,r]=(0,C.Z)(E),o=(0,p.B)().context,{makeRefMarker:s}=(0,T.Lz)(),n=(0,u.EO)(),l=(0,g.hg)({weblabID:f.lh.IMDB_WEB_PACE_CREDITS_1201882,treatments:{T1:!0}}),c=(0,m.ik)()&&o.pageType===d.PageType.NAME,x=!!o.sidecar?.localizationResponse.isOriginalTitlePreferenceSet;return{addConstToList:{executeAddConstToList:(t,i)=>{let r=e.overrideRefTag??s([T.Cd.ADD,T.Cd.ITEMS]);return n({refMarkerString:r,pageAction:e.overrideAddPageAction??(c?`${I}-${i}`:I),customPageMetadata:{id:i}}),a({listId:t,constId:i,includeListItemMetadata:!!e.includeListItemMetadata,refTagQueryParam:r,originalTitleText:x,isInPace:l})},addConstToListResult:t},removeConstFromList:{executeRemoveConstFromList:(t,a)=>(n({refMarkerString:e.overrideRefTag??s([T.Cd.DELETE,T.Cd.ITEMS]),pageAction:e.overrideRemovePageAction??(c?`${h}-${a}`:h),customPageMetadata:{id:a}}),r({listId:t,constId:a})),removeConstFromListResult:i}}},b=r()`
    mutation AddConstToList(
        $listId: ID!
        $constId: ID!
        $includeListItemMetadata: Boolean!
        $refTagQueryParam: String
        $originalTitleText: Boolean
        $isInPace: Boolean! = false
    ) {
        addItemToList(
            input: { listId: $listId, item: { itemElementId: $constId } }
        ) {
            listId
            modifiedItem {
                ...EditListItemMetadata
                listItem @include(if: $includeListItemMetadata) {
                    ... on Title {
                        ...TitleListItemMetadata
                    }
                    ... on Name {
                        ...NameListItemMetadata
                    }
                    ... on Image {
                        ...ImageListItemMetadata
                    }
                    ... on Video {
                        ...VideoListItemMetadata
                    }
                }
            }
        }
    }

    ${n.rc}
    ${l.Zz}
    ${s.E}
    ${o.w}
    ${c.X}
`,E=r()`
    mutation RemoveConstFromList($listId: ID!, $constId: ID!) {
        removeElementFromList(
            input: { listId: $listId, itemElementId: $constId }
        ) {
            listId
        }
    }
`}}]);