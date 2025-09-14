"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4503],{85018:function(t,e,i){i.d(e,{F4:function(){return o},sq:function(){return r},uN:function(){return s}});var a=i(30382),n=i.n(a);let r=n()`
    fragment BaseTitleCard on Title {
        id
        titleText {
            text
        }
        titleType {
            id
            text
            canHaveEpisodes
            displayableProperty {
                value {
                    plainText
                }
            }
        }
        originalTitleText {
            text
        }
        primaryImage {
            id
            width
            height
            url
            caption {
                plainText
            }
        }
        releaseYear {
            year
            endYear
        }
        ratingsSummary {
            aggregateRating
            voteCount
        }
        runtime {
            seconds
        }
        certificate {
            rating
        }
        canRate {
            isRatable
        }
        titleGenres {
            genres(limit: 3) {
                genre {
                    text
                }
            }
        }
    }
`,o=n()`
    fragment TitleCardTrailer on Title {
        latestTrailer {
            id
        }
    }
`,s=n()`
    fragment PersonalizedTitleCardUserRating on Title {
        userRating @include(if: $includeUserRating) {
            value
        }
    }
`},11602:function(t,e,i){i.d(e,{Vc:function(){return o},qb:function(){return r},vW:function(){return s}});var a=i(30382),n=i.n(a);let r=n()`
    mutation TrackConst($input: SetTrackNotificationPreferencesInput!) {
        trackConst(input: $input) {
            constId
            message {
                language
                value
            }
            success
        }
    }
`,o=n()`
    mutation UntrackConst($input: UntrackConstInput!) {
        untrackConst(input: $input) {
            constId
            message {
                language
                value
            }
            success
        }
    }
`,s=n()`
    fragment TrackPreferences on TrackNotificationPreferences {
        isTracking
        notificationPreferences {
            interested
            type {
                text
                typeId
            }
        }
    }
`},40981:function(t,e,i){i.d(e,{Nf:function(){return p},z7:function(){return g}});var a=i(52322),n=i(86704),r=i(72779),o=i.n(r);i(2784);var s=i(53665),l=i(19596),u=i(88169),d=i(94471),c=i(92847);let g={CONTAINER:"ratingGroup--container",IMDB_RATING:"ratingGroup--imdb-rating",OTHER_USER_RATING:"ratingGroup--other-user-rating",PLACEHOLDER:"ratingGroup--placeholder",USER_RATING:"ratingGroup--user-rating"},m="hide-vote-count",f="standalone-star",p=t=>{let{canRate:e,className:i,hideMaxIMDbRating:n,hideVoteCountOnSmallBreakpoints:r,otherUserRating:l,titleId:p,ratingsSummary:T,rateButtonLabel:h,showPlaceholderStarIfApplicable:I,titleText:x,refOverride:b}=t,v=(0,s.Z)(),{rating:N}=(0,u.useRatingsContext)(p)||{},C=(0,d.P)(N,"user"),P=(0,d.P)(T?.aggregateRating,"imdb"),M=(0,d.P)(l,"user"),L=v.formatMessage({id:"common_ariaLabels_IMDbRating",defaultMessage:"IMDb rating: {rating}"},{rating:P||""}),$=v.formatMessage({id:"common_ariaLabels_other_user_rating",defaultMessage:"User rating: {value}"},{value:l}),k=v.formatMessage({id:"common_ariaLabels_ratingButtonRated",defaultMessage:"Your rating: {rating}"},{rating:C||""}),E=v.formatMessage({id:"common_ariaLabels_ratingButtonUnrated",defaultMessage:"Rate {titleName}"},{titleName:x}),S=v.formatMessage({id:"common_ratingPrompt_rate",defaultMessage:"Rate"}),y=T?.voteCount?v.formatNumber(T?.voteCount,{notation:"compact",compactDisplay:"short"}):void 0,w=I&&!P&&!(e&&x);return(0,a.jsxs)(R,{className:i,"data-testid":g.CONTAINER,children:[!!P&&(0,a.jsx)(u.RatingStar,{"data-testid":g.IMDB_RATING,ariaLabel:L,className:g.IMDB_RATING,formattedRating:P,maxRating:n?void 0:10,formattedVoteCount:y,voteCountClassName:r?m:""}),!!l&&(0,a.jsx)(u.RatingStar,{ariaLabel:$,className:g.OTHER_USER_RATING,"data-testid":g.OTHER_USER_RATING,formattedRating:M,type:"otherUser"}),!!e&&!!x&&(0,a.jsx)(c.T,{title:{id:p,titleText:x,canRate:e},refOverride:b,ratingTriggerComponent:t=>{let{onUserRatingClick:e}=t;return(0,a.jsx)(_,{ariaLabelRated:k,ariaLabelUnrated:E,formattedRating:C,className:o()(g.USER_RATING,{[f]:!P}),onClick:e,rateLabel:"string"==typeof h?h:S})}}),!!w&&(0,a.jsx)(u.RatingStar,{"data-testid":g.PLACEHOLDER,"aria-hidden":!0,className:o()(g.PLACEHOLDER,f),type:"placeholder"})]})},R=l.ZP.div.withConfig({componentId:"sc-17ce9e4b-0"})(["align-items:center;display:inline-flex;flex-flow:row wrap;flex-direction:row;gap:0 ",";.","{padding:0;min-width:0;}.","{","{display:none;}}"],n.spacing.xs,f,m,n.mediaQueries.breakpoints.below.m),_=(0,l.ZP)(u.RateButton).withConfig({componentId:"sc-17ce9e4b-1"})(["font-size:inherit;height:fit-content;padding:0;"])},92847:function(t,e,i){i.d(e,{T:function(){return h}});var a=i(52322),n=i(77725),r=i(98644),o=i(44958),s=i(2784),l=i(75824),u=i(82433),d=i(84314),c=i(11438),g=i(14438),m=i(37179),f=i(30634);let p={id:"common_ratingPrompt_header",defaultMessage:"Rate this"},R={id:"common_ratingPrompt_rate",defaultMessage:"Rate"},_={id:"common_ratingPrompt_removeRating",defaultMessage:"Remove rating"},T={id:"common_ratingPrompt_ariaLabelPrefix",defaultMessage:"Rating"},h=t=>{let{title:{id:e,titleText:i,canRate:h,posterImage:I},ratingTriggerComponent:x,refOverride:b}=t,[v,N]=(0,s.useState)(!1),C=(0,d.n)(),{makeRefMarker:P}=(0,c.Lz)(),{rating:M,updateRating:L,deleteRating:$}=(0,r.nj)(e)||{},k=P(b?[(0,c.Qk)({refStr:b,explanation:"Not all usages of RatingPrompt have been converted to link builders."}),c.Cd.RATING]:c.Cd.RATING),E=(0,g.EO)(),{updateTitleRating:S,deleteTitleRating:y,tempRateUpdateLogRef:w}=(0,u.vY)({titleId:e,refTag:k,currentRating:M}),U=(0,l.N)(p),A=(0,l.N)(R),O=(0,l.N)(_),D=(0,l.N)(T),G=(0,f.pl)();return(0,a.jsxs)(a.Fragment,{children:[x({onUserRatingClick:()=>{h&&(E({pageAction:m.QJ.USER_RATING_PROMPT_OPEN,hitType:n.Re.POP_UP,refMarkerString:k}),N(!0))}}),!!h&&(0,a.jsx)(r.TB,{isOpen:v,tconst:e,title:i,posterImage:I,headerLabel:U,rateLabel:A,ariaLabelPrefix:D,shouldUseNewRatingFlow:!0,secondaryButtonText:O,secondaryButtonType:o.uu.RemoveRating,onPrimaryButtonClicked:async(t,e)=>{if(!t){N(!1);return}C?(N(!1),L?.(t,k,()=>S(t,e))):(await w(t,e),G({rating:t,titleId:e,ref:k}))},onSecondaryButtonClicked:async(t,e)=>{N(!1),$?.(k,()=>y(e))},onCloseClicked:()=>{N(!1)}})]})}},2870:function(t,e,i){i.d(e,{f:function(){return u}});var a=i(52322);i(2784);var n=i(19596),r=i(88169),o=i(75824),s=i(11438),l=i(12563);let u=t=>{let{titleId:e,refOverride:i}=t,{makeRefMarker:n}=(0,s.Lz)(),{isInWatchlist:u,isPending:c,onClick:g,ariaLabel:m}=(0,l.X)(e,n(i||[s.Cd.WATCHLIST,s.Cd.BUTTON])),f=(0,o.N)({id:"common_buttons_watchlist",defaultMessage:"Watchlist"});return(0,a.jsxs)(r.SecondaryButton,{ariaLabel:m,onClick:g,width:"full-width",preIcon:c?void 0:u?"done":"add",disabled:c,children:[!!c&&(0,a.jsx)(d,{"data-testid":"watchlist-button-loader",type:"circle"}),!c&&f]})},d=(0,n.ZP)(r.Loader).withConfig({componentId:"sc-eebd0785-0"})(["max-height:30px;max-width:30px;vertical-align:middle;"]);e.Z=u},94471:function(t,e,i){i.d(e,{P:function(){return r}});var a=i(53665);let n={default:{maximumFractionDigits:1,minimumFractionDigits:1},imdb:{maximumFractionDigits:1,minimumFractionDigits:1},user:{maximumFractionDigits:0,minimumFractionDigits:0}},r=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",i=arguments.length>2?arguments[2]:void 0,r=(0,a.Z)();if(!t)return"";if(10===t)return"10";let o="user"===e?Math.trunc(t):Number(t.toFixed(1)),s=i??n[e];return r.formatNumber(o,s)}},22073:function(t,e,i){var a,n;function r(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";if(t<=0)return"hours_minutes_explicit"===e?"0min":"hours_minutes_explicit_short"===e?"0m":"iso_8601"===e?"PT0S":"0:00";let i=Math.floor(t/3600),a=Math.floor(t%3600/60),n=Math.floor(t%60);if("hours_minutes_explicit"===e||"hours_minutes_explicit_short"===e)return(t<60&&t>0&&(a=1),i>0&&a<=0)?`${i}h`:`${i>0?i+"h "+a:a}${"hours_minutes_explicit_short"===e?"m":"min"}`;if("iso_8601"!==e)return`${i>0?i+":"+o(a):a}:${o(n)}`;{let t=i?`${i}H`:"",e=a?`${a}M`:"",r=n?`${n}S`:"";return`PT${t}${e}${r}`}}function o(t){return t<=0||!Number.isInteger(t)?"00":t>9?`${t}`:`0${t}`}i.d(e,{A:function(){return a},L:function(){return r}}),(n=a||(a={})).DEFAULT="default",n.HOURS_MINUTES_EXPLICIT="hours_minutes_explicit",n.HOURS_MINUTES_EXPLICIT_SHORT="hours_minutes_explicit_short",n.ISO_8601="iso_8601"},82433:function(t,e,i){i.d(e,{vY:function(){return d}});var a=i(30382),n=i.n(a),r=i(22619),o=i(14438),s=i(17503);let l=n()`
    mutation UpdateTitleRating($rating: Int!, $titleId: ID!) {
        rateTitle(input: { rating: $rating, titleId: $titleId }) {
            rating {
                value
            }
        }
    }
`,u=n()`
    mutation DeleteTitleRating($titleId: ID!) {
        deleteTitleRating(input: { titleId: $titleId }) {
            date
        }
    }
`,d=t=>{let[,e]=(0,s.Z)(l),[,i]=(0,s.Z)(u),a=(0,o.EO)(),{addToWatchedTitles:n}=(0,r.V)(),d=e=>{a({refMarkerString:t.refTag,pageAction:e,customPageMetadata:{id:t.titleId}})};return{updateTitleRating:(t,i)=>(d(`rating-add-${i}-${t}`),n(i),e({rating:t,titleId:i})),deleteTitleRating:t=>(d(`rating-del-${t}`),i({titleId:t})),tempRateUpdateLogRef:async(t,e)=>{d(`tmp-rating-add-${e}-${t}`)}}}},95441:function(t,e,i){i.d(e,{S:function(){return n}});var a=i(19596);let n=t=>(0,a.iv)(["@supports (-webkit-line-clamp:","){display:-webkit-box;-webkit-line-clamp:",";-webkit-box-orient:vertical;overflow:hidden;}"],t,t)}}]);