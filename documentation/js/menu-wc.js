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
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">liga-manager-ui documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
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
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AdminModule-6026e5b456f2f4b9ffdcd20cc5e3d29f"' : 'data-target="#xs-components-links-module-AdminModule-6026e5b456f2f4b9ffdcd20cc5e3d29f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AdminModule-6026e5b456f2f4b9ffdcd20cc5e3d29f"' : 'id="xs-components-links-module-AdminModule-6026e5b456f2f4b9ffdcd20cc5e3d29f"' }>
                                        <li class="link">
                                            <a href="components/AddteamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddteamComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AddtournamentroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddtournamentroundComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ManageseasonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageseasonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ManagetournamentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagetournamentComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ManageusersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageusersComponent</a>
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
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-b862f1066d78fd6e2ab5c37954e66139"' : 'data-target="#xs-components-links-module-AppModule-b862f1066d78fd6e2ab5c37954e66139"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-b862f1066d78fd6e2ab5c37954e66139"' : 'id="xs-components-links-module-AppModule-b862f1066d78fd6e2ab5c37954e66139"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ChangepasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangepasswordComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
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
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' : 'data-target="#xs-components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' : 'id="xs-components-links-module-ContactlistModule-8400c9e075d6d3ae89c29dd2f323cf78"' }>
                                        <li class="link">
                                            <a href="components/ContactlistComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactlistComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PitchesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PitchesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContactlistRoutingModule.html" data-type="entity-link">ContactlistRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/MatchplanModule.html" data-type="entity-link">MatchplanModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' : 'data-target="#xs-components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' : 'id="xs-components-links-module-MatchplanModule-cf3653825ca3059ad65e805f69782af9"' }>
                                        <li class="link">
                                            <a href="components/MatchplanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatchplanComponent</a>
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
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' : 'data-target="#xs-components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' : 'id="xs-components-links-module-NewpasswordModule-017d37ac4e2737f5138b7014889705b5"' }>
                                        <li class="link">
                                            <a href="components/NewpasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewpasswordComponent</a>
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
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' : 'data-target="#xs-components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' : 'id="xs-components-links-module-SharedModule-7d87834bd6bfff22ea0d4bdb615c615d"' }>
                                        <li class="link">
                                            <a href="components/ContactComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ContactPersonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactPersonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditmatchPitchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditmatchPitchComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditmatchResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditmatchResultComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditmatchTimeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditmatchTimeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MatchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatchComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SeasonchooserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SeasonchooserComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SnackbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnackbarComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TableModule.html" data-type="entity-link">TableModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' : 'data-target="#xs-components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' : 'id="xs-components-links-module-TableModule-593dd29264e7b45c3db80fe18146c3bb"' }>
                                        <li class="link">
                                            <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableComponent</a>
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
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' : 'data-target="#xs-components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' : 'id="xs-components-links-module-TeamadminModule-694e18264bf1368270b32dbb632a9ccb"' }>
                                        <li class="link">
                                            <a href="components/TeamadminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamadminComponent</a>
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
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' : 'data-target="#xs-components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' : 'id="xs-components-links-module-TournamentModule-7c1e86103bd86cffe59728c37f0ce498"' }>
                                        <li class="link">
                                            <a href="components/TournamentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TournamentComponent</a>
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
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#components-links"' : 'data-target="#xs-components-links"' }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/PitchesComponent.html" data-type="entity-link">PitchesComponent</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/ChangePasswordBody.html" data-type="entity-link">ChangePasswordBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/Contact_person.html" data-type="entity-link">Contact_person</a>
                    </li>
                    <li class="link">
                        <a href="classes/CreateMatchDaysBody.html" data-type="entity-link">CreateMatchDaysBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/CreatePitchBody.html" data-type="entity-link">CreatePitchBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/CreateSeasonBody.html" data-type="entity-link">CreateSeasonBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/CreateTeamBody.html" data-type="entity-link">CreateTeamBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/CreateTournamentBody.html" data-type="entity-link">CreateTournamentBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/CreateUserBody.html" data-type="entity-link">CreateUserBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/Credentials.html" data-type="entity-link">Credentials</a>
                    </li>
                    <li class="link">
                        <a href="classes/Date_period.html" data-type="entity-link">Date_period</a>
                    </li>
                    <li class="link">
                        <a href="classes/Identifier.html" data-type="entity-link">Identifier</a>
                    </li>
                    <li class="link">
                        <a href="classes/LocateMatchBody.html" data-type="entity-link">LocateMatchBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/Match.html" data-type="entity-link">Match</a>
                    </li>
                    <li class="link">
                        <a href="classes/MatchViewModel.html" data-type="entity-link">MatchViewModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/Match_day.html" data-type="entity-link">Match_day</a>
                    </li>
                    <li class="link">
                        <a href="classes/Pitch.html" data-type="entity-link">Pitch</a>
                    </li>
                    <li class="link">
                        <a href="classes/Ranking.html" data-type="entity-link">Ranking</a>
                    </li>
                    <li class="link">
                        <a href="classes/Ranking_position.html" data-type="entity-link">Ranking_position</a>
                    </li>
                    <li class="link">
                        <a href="classes/ScheduleMatchBody.html" data-type="entity-link">ScheduleMatchBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/Season.html" data-type="entity-link">Season</a>
                    </li>
                    <li class="link">
                        <a href="classes/SendPasswordResetMailBody.html" data-type="entity-link">SendPasswordResetMailBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetRoundBody.html" data-type="entity-link">SetRoundBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/SubmitMatchResultBody.html" data-type="entity-link">SubmitMatchResultBody</a>
                    </li>
                    <li class="link">
                        <a href="classes/SwaggerException.html" data-type="entity-link">SwaggerException</a>
                    </li>
                    <li class="link">
                        <a href="classes/Team.html" data-type="entity-link">Team</a>
                    </li>
                    <li class="link">
                        <a href="classes/Team_pairs.html" data-type="entity-link">Team_pairs</a>
                    </li>
                    <li class="link">
                        <a href="classes/Tournament.html" data-type="entity-link">Tournament</a>
                    </li>
                    <li class="link">
                        <a href="classes/User.html" data-type="entity-link">User</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Client.html" data-type="entity-link">Client</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CustomOwlDateTimeIntl.html" data-type="entity-link">CustomOwlDateTimeIntl</a>
                            </li>
                            <li class="link">
                                <a href="injectables/I18Service.html" data-type="entity-link">I18Service</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MatchService.html" data-type="entity-link">MatchService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PitchService.html" data-type="entity-link">PitchService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/SeasonService.html" data-type="entity-link">SeasonService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TeamService.html" data-type="entity-link">TeamService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/WebsocketService.html" data-type="entity-link">WebsocketService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                </li>
                <li class="link">
                    <a href="guards/TeamadminGuard.html" data-type="entity-link">TeamadminGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/AddMatchData.html" data-type="entity-link">AddMatchData</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CacheTeamsInSeason.html" data-type="entity-link">CacheTeamsInSeason</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IChangePasswordBody.html" data-type="entity-link">IChangePasswordBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IClient.html" data-type="entity-link">IClient</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IContact_person.html" data-type="entity-link">IContact_person</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ICreateMatchDaysBody.html" data-type="entity-link">ICreateMatchDaysBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ICreatePitchBody.html" data-type="entity-link">ICreatePitchBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ICreateSeasonBody.html" data-type="entity-link">ICreateSeasonBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ICreateTeamBody.html" data-type="entity-link">ICreateTeamBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ICreateTournamentBody.html" data-type="entity-link">ICreateTournamentBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ICreateUserBody.html" data-type="entity-link">ICreateUserBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IDate_period.html" data-type="entity-link">IDate_period</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IIdentifier.html" data-type="entity-link">IIdentifier</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ILocateMatchBody.html" data-type="entity-link">ILocateMatchBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IMatch.html" data-type="entity-link">IMatch</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IMatch_day.html" data-type="entity-link">IMatch_day</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IPitch.html" data-type="entity-link">IPitch</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IRanking.html" data-type="entity-link">IRanking</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IRanking_position.html" data-type="entity-link">IRanking_position</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IScheduleMatchBody.html" data-type="entity-link">IScheduleMatchBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ISeason.html" data-type="entity-link">ISeason</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ISendPasswordResetMailBody.html" data-type="entity-link">ISendPasswordResetMailBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ISetRoundBody.html" data-type="entity-link">ISetRoundBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ISnackBarData.html" data-type="entity-link">ISnackBarData</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ISubmitMatchResultBody.html" data-type="entity-link">ISubmitMatchResultBody</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ITeam.html" data-type="entity-link">ITeam</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ITeam_pairs.html" data-type="entity-link">ITeam_pairs</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ITournament.html" data-type="entity-link">ITournament</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/LoginContext.html" data-type="entity-link">LoginContext</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MatchUpdateMessage.html" data-type="entity-link">MatchUpdateMessage</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
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
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
