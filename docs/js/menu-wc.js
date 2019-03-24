'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">liga-manager-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-01feebd04b396b2a7a6aaf4048030590"' : 'data-target="#xs-components-links-module-AdminModule-01feebd04b396b2a7a6aaf4048030590"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-01feebd04b396b2a7a6aaf4048030590"' :
                                            'id="xs-components-links-module-AdminModule-01feebd04b396b2a7a6aaf4048030590"' }>
                                            <li class="link">
                                                <a href="components/AddUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddteamComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddteamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddtournamentroundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddtournamentroundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageseasonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageseasonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagetournamentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagetournamentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageusersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageusersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatchSchedulingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatchSchedulingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RenameTeamComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RenameTeamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppCoreModule.html" data-type="entity-link">AppCoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' : 'data-target="#xs-components-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' :
                                            'id="xs-components-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangepasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangepasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' : 'data-target="#xs-injectables-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' :
                                        'id="xs-injectables-links-module-AppModule-37d29530b949d7f817dd8bb759f6edb3"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContactlistModule.html" data-type="entity-link">ContactlistModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' : 'data-target="#xs-components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' :
                                            'id="xs-components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' }>
                                            <li class="link">
                                                <a href="components/ContactlistComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactlistComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PitchesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PitchesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContactlistRoutingModule.html" data-type="entity-link">ContactlistRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link">EventsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EventsModule-adb5c6a96ece8b622c63ff809145766d"' : 'data-target="#xs-components-links-module-EventsModule-adb5c6a96ece8b622c63ff809145766d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventsModule-adb5c6a96ece8b622c63ff809145766d"' :
                                            'id="xs-components-links-module-EventsModule-adb5c6a96ece8b622c63ff809145766d"' }>
                                            <li class="link">
                                                <a href="components/EventsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsRoutingModule.html" data-type="entity-link">EventsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GraphQLModule.html" data-type="entity-link">GraphQLModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GraphQLModule-624bdf65465802d7de925c71e90fdeb1"' : 'data-target="#xs-injectables-links-module-GraphQLModule-624bdf65465802d7de925c71e90fdeb1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GraphQLModule-624bdf65465802d7de925c71e90fdeb1"' :
                                        'id="xs-injectables-links-module-GraphQLModule-624bdf65465802d7de925c71e90fdeb1"' }>
                                        <li class="link">
                                            <a href="injectables/GraphqlSubscriptionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GraphqlSubscriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MatchplanModule.html" data-type="entity-link">MatchplanModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' : 'data-target="#xs-components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' :
                                            'id="xs-components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' }>
                                            <li class="link">
                                                <a href="components/MatchplanComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatchplanComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MatchplanRoutingModule.html" data-type="entity-link">MatchplanRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewpasswordModule.html" data-type="entity-link">NewpasswordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' : 'data-target="#xs-components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' :
                                            'id="xs-components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' }>
                                            <li class="link">
                                                <a href="components/NewpasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewpasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewpasswordRoutingModule.html" data-type="entity-link">NewpasswordRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' : 'data-target="#xs-components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' :
                                            'id="xs-components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' }>
                                            <li class="link">
                                                <a href="components/ContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactPersonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactPersonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditmatchPitchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditmatchPitchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditmatchResultComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditmatchResultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditmatchTimeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditmatchTimeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeasonchooserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SeasonchooserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnackbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnackbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableModule.html" data-type="entity-link">TableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' : 'data-target="#xs-components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' :
                                            'id="xs-components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' }>
                                            <li class="link">
                                                <a href="components/TableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableRoutingModule.html" data-type="entity-link">TableRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeamadminModule.html" data-type="entity-link">TeamadminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' : 'data-target="#xs-components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' :
                                            'id="xs-components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' }>
                                            <li class="link">
                                                <a href="components/TeamadminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamadminComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamadminRoutingModule.html" data-type="entity-link">TeamadminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TournamentModule.html" data-type="entity-link">TournamentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' : 'data-target="#xs-components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' :
                                            'id="xs-components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' }>
                                            <li class="link">
                                                <a href="components/TournamentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TournamentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TournamentRoutingModule.html" data-type="entity-link">TournamentRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/PitchesComponent.html" data-type="entity-link">PitchesComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddTeamToSeasonGQL.html" data-type="entity-link">AddTeamToSeasonGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AllSeasonsListGQL.html" data-type="entity-link">AllSeasonsListGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AllTeamsGQL.html" data-type="entity-link">AllTeamsGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AllTournamentListGQL.html" data-type="entity-link">AllTournamentListGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AllUsersGQL.html" data-type="entity-link">AllUsersGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateMatchesForSeasonGQL.html" data-type="entity-link">CreateMatchesForSeasonGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateSeasonGQL.html" data-type="entity-link">CreateSeasonGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateTournamentGQL.html" data-type="entity-link">CreateTournamentGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateTournamentRoundGQL.html" data-type="entity-link">CreateTournamentRoundGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserGQL.html" data-type="entity-link">CreateUserGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomOwlDateTimeIntl.html" data-type="entity-link">CustomOwlDateTimeIntl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventGQL.html" data-type="entity-link">EventGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraphqlSubscriptionService.html" data-type="entity-link">GraphqlSubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/I18Service.html" data-type="entity-link">I18Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LatestEventGQL.html" data-type="entity-link">LatestEventGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocateMatchGQL.html" data-type="entity-link">LocateMatchGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchGQL.html" data-type="entity-link">MatchGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchPlanGQL.html" data-type="entity-link">MatchPlanGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchService.html" data-type="entity-link">MatchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordChangeGQL.html" data-type="entity-link">PasswordChangeGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordResetGQL.html" data-type="entity-link">PasswordResetGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PitchesGQL.html" data-type="entity-link">PitchesGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PitchService.html" data-type="entity-link">PitchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RankingGQL.html" data-type="entity-link">RankingGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisEventGQL.html" data-type="entity-link">RedisEventGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RemoveTeamFromSeasonGQL.html" data-type="entity-link">RemoveTeamFromSeasonGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RenameTeamGQL.html" data-type="entity-link">RenameTeamGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScheduleMatchGQL.html" data-type="entity-link">ScheduleMatchGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeasonService.html" data-type="entity-link">SeasonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StartSeasonGQL.html" data-type="entity-link">StartSeasonGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubmitResultGQL.html" data-type="entity-link">SubmitResultGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamService.html" data-type="entity-link">TeamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamsGQL.html" data-type="entity-link">TeamsGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TournamentGQL.html" data-type="entity-link">TournamentGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateTeamContactGQL.html" data-type="entity-link">UpdateTeamContactGQL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserGQL.html" data-type="entity-link">UserGQL</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TeamadminGuard.html" data-type="entity-link">TeamadminGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddMatchData.html" data-type="entity-link">AddMatchData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credentials.html" data-type="entity-link">Credentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatePeriod.html" data-type="entity-link">DatePeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IntrospectionResultData.html" data-type="entity-link">IntrospectionResultData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IntrospectionResultData-1.html" data-type="entity-link">IntrospectionResultData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPossibleKickoffs.html" data-type="entity-link">IPossibleKickoffs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISnackBarData.html" data-type="entity-link">ISnackBarData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeamCanPlayAtDate.html" data-type="entity-link">ITeamCanPlayAtDate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginContext.html" data-type="entity-link">LoginContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MatchEventPayload.html" data-type="entity-link">MatchEventPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoundTeam.html" data-type="entity-link">RoundTeam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamIdPair.html" data-type="entity-link">TeamIdPair</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});