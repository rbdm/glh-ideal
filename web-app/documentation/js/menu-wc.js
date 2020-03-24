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
                    <a href="index.html" data-type="index-link">web-app documentation</a>
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-336468d33c7e409d85dbec863c7b3c22"' : 'data-target="#xs-components-links-module-AppModule-336468d33c7e409d85dbec863c7b3c22"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-336468d33c7e409d85dbec863c7b3c22"' :
                                            'id="xs-components-links-module-AppModule-336468d33c7e409d85dbec863c7b3c22"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CodeEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CodeEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CodeSideNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CodeSideNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObjectBuilderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObjectBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisualEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VisualEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisualObjectEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VisualObjectEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisualSideNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VisualSideNavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AdjacencyMatrix.html" data-type="entity-link">AdjacencyMatrix</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/BuildableByForm.html" data-type="entity-link">BuildableByForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataEvent.html" data-type="entity-link">DataEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/DirectedLegalObjectLink.html" data-type="entity-link">DirectedLegalObjectLink</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForceGraph.html" data-type="entity-link">ForceGraph</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalSelectionEvent.html" data-type="entity-link">GlobalSelectionEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/GraphData.html" data-type="entity-link">GraphData</a>
                            </li>
                            <li class="link">
                                <a href="classes/GraphLink.html" data-type="entity-link">GraphLink</a>
                            </li>
                            <li class="link">
                                <a href="classes/GraphListenerEvent.html" data-type="entity-link">GraphListenerEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/GraphNode.html" data-type="entity-link">GraphNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/GraphOptions.html" data-type="entity-link">GraphOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/LegalData.html" data-type="entity-link">LegalData</a>
                            </li>
                            <li class="link">
                                <a href="classes/LegalLinkData.html" data-type="entity-link">LegalLinkData</a>
                            </li>
                            <li class="link">
                                <a href="classes/LegalNodeData.html" data-type="entity-link">LegalNodeData</a>
                            </li>
                            <li class="link">
                                <a href="classes/LegalObject.html" data-type="entity-link">LegalObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/LegalObjectLink.html" data-type="entity-link">LegalObjectLink</a>
                            </li>
                            <li class="link">
                                <a href="classes/LegalObjectNode.html" data-type="entity-link">LegalObjectNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/Person.html" data-type="entity-link">Person</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonBuilder.html" data-type="entity-link">PersonBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonData.html" data-type="entity-link">PersonData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Possession.html" data-type="entity-link">Possession</a>
                            </li>
                            <li class="link">
                                <a href="classes/PossessionBuilder.html" data-type="entity-link">PossessionBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/PossessionData.html" data-type="entity-link">PossessionData</a>
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
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataModelService.html" data-type="entity-link">DataModelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalSelectionService.html" data-type="entity-link">GlobalSelectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraphVisualService.html" data-type="entity-link">GraphVisualService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LegalObjectService.html" data-type="entity-link">LegalObjectService</a>
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
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
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