export type YoutubePlaylistInitialData = {
  responseContext?: ResponseContext;
  contents?: Contents;
  header?: YoutubePlaylistInitialDataHeader;
  metadata?: YoutubePlaylistInitialDataMetadata;
  trackingParams?: string;
  topbar?: Topbar;
  microformat?: Microformat;
  sidebar?: Sidebar;
};

type Contents = {
  twoColumnBrowseResultsRenderer?: TwoColumnBrowseResultsRenderer;
};

type TwoColumnBrowseResultsRenderer = {
  tabs?: Tab[];
};

type Tab = {
  tabRenderer?: TabRenderer;
};

type TabRenderer = {
  selected?: boolean;
  content?: TabRendererContent;
  tabIdentifier?: string;
  trackingParams?: string;
};

type TabRendererContent = {
  sectionListRenderer?: PurpleSectionListRenderer;
};

type PurpleSectionListRenderer = {
  contents?: PurpleContent[];
  trackingParams?: string;
  targetId?: string;
};

export type PurpleContent = {
  itemSectionRenderer?: PurpleItemSectionRenderer;
  continuationItemRenderer?: ContinuationItemRenderer;
};

type ContinuationItemRenderer = {
  trigger?: string;
  continuationEndpoint?: ContinuationEndpoint;
};

type ContinuationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  continuationCommand?: ContinuationCommand;
};

type ContinuationEndpointCommandMetadata = {
  webCommandMetadata?: PurpleWebCommandMetadata;
};

type PurpleWebCommandMetadata = {
  sendPost?: boolean;
  apiUrl?: APIURL;
};

type APIURL =
  | "/youtubei/v1/browse"
  | "/youtubei/v1/share/get_share_panel"
  | "/youtubei/v1/playlist/create"
  | "/youtubei/v1/account/account_menu";

type ContinuationCommand = {
  token?: string;
  request?: string;
};

type PurpleItemSectionRenderer = {
  contents?: FluffyContent[];
  trackingParams?: string;
};

export type FluffyContent = {
  playlistVideoListRenderer?: PlaylistVideoListRenderer;
  lockupViewModel?: LockupViewModel;
};

type PlaylistVideoListRenderer = {
  contents?: PlaylistVideoListRendererContent[];
  playlistId?: TID;
  isEditable?: boolean;
  canReorder?: boolean;
  trackingParams?: string;
  targetId?: TID;
};

export type PlaylistVideoListRendererContent = {
  playlistVideoRenderer?: PlaylistVideoRenderer;
};

type LockupViewModel = {
  contentImage?: ContentImage;
  metadata?: LockupViewModelMetadata;
  contentId?: string;
  contentType?:
    | "LOCKUP_CONTENT_TYPE_VIDEO"
    | "LOCKUP_CONTENT_TYPE_PLAYLIST"
    | "LOCKUP_CONTENT_TYPE_PODCAST";
  rendererContext?: LockupViewModelRendererContext;
};

type ContentImage = {
  thumbnailViewModel?: ThumbnailViewModel;
};

type ThumbnailViewModel = {
  image?: ThumbnailViewModelImage;
  overlays?: ThumbnailViewModelOverlay[];
};

type ThumbnailViewModelOverlay = {
  thumbnailBottomOverlayViewModel?: ThumbnailBottomOverlayViewModel;
  thumbnailHoverOverlayToggleActionsViewModel?: ThumbnailHoverOverlayToggleActionsViewModel;
};

type ThumbnailHoverOverlayToggleActionsViewModel = {
  buttons?: ButtonElement[];
};

type ButtonElement = {
  toggleButtonViewModel?: ButtonToggleButtonViewModel;
};

type ButtonToggleButtonViewModel = {
  defaultButtonViewModel?: ButtonViewModel;
  // toggledButtonViewModel?: ToggledButtonViewModel;
  isToggled?: boolean;
  trackingParams?: string;
};

type ThumbnailBottomOverlayViewModel = {
  badges?: Badge[];
};

type Badge = {
  thumbnailBadgeViewModel?: ThumbnailBadgeViewModel;
};

type ThumbnailBadgeViewModel = {
  text?: string;
  badgeStyle?: "THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT";
  animationActivationTargetId?: string;
  animationActivationEntityKey?: string;
  lottieData?: LottieData;
  animatedText?: string;
  animationActivationEntitySelectorType?: "THUMBNAIL_BADGE_ANIMATION_ENTITY_SELECTOR_TYPE_PLAYER_STATE";
  rendererContext?: ThumbnailBadgeViewModelRendererContext;
  icon?: Icon;
  inlinePlaybackBadgeData?: InlinePlaybackBadgeData;
};

type LottieData = {
  url?: string;
  settings?: Settings;
};

type Settings = {
  loop?: boolean;
  autoplay?: boolean;
};

type InlinePlaybackBadgeData = {
  replicateAsTimestamp?: boolean;
};

type ThumbnailBadgeViewModelRendererContext = {
  accessibilityContext?: AccessibilityContextClass;
};

type ThumbnailViewModelImage = {
  sources?: ThumbnailElement[];
};

type LockupViewModelRendererContext = {
  loggingContext?: PurpleLoggingContext;
  accessibilityContext?: AccessibilityContextClass;
  commandContext?: TentacledCommandContext;
};

type LockupViewModelMetadata = {
  lockupMetadataViewModel?: LockupMetadataViewModel;
};

type LockupMetadataViewModel = {
  title?: HeadlineClass;
  image?: LockupMetadataViewModelImage;
  metadata?: LockupMetadataViewModelMetadata;
};

type LockupMetadataViewModelImage = {
  decoratedAvatarViewModel?: DecoratedAvatarViewModel;
};

type DecoratedAvatarViewModel = {
  rendererContext?: DecoratedAvatarViewModelRendererContext;
};

type DecoratedAvatarViewModelRendererContext = {
  commandContext?: PurpleCommandContext;
};

type LockupMetadataViewModelMetadata = {
  contentMetadataViewModel?: PurpleContentMetadataViewModel;
};

type PurpleContentMetadataViewModel = {
  metadataRows?: PurpleMetadataRow[];
  delimiter?: " • ";
};

type PurpleMetadataRow = {
  metadataParts?: PurpleMetadataPart[];
};

type PurpleMetadataPart = {
  text?: MetadataPartText;
};

type MetadataPartText = {
  content?: string;
  commandRuns?: CommandRun[];
  styleRuns?: PurpleStyleRun[];
};

type PlaylistVideoRenderer = {
  videoId?: string;
  thumbnail?: PlaylistVideoRendererThumbnail;
  title?: PurpleTitle;
  index?: ContentClass;
  shortBylineText?: ShortBylineTextClass;
  lengthText?: LengthTextClass;
  navigationEndpoint?: PlaylistVideoRendererNavigationEndpoint;
  lengthSeconds?: string;
  trackingParams?: string;
  isPlayable?: boolean;
  menu?: PlaylistVideoRendererMenu;
  thumbnailOverlays?: PlaylistVideoRendererThumbnailOverlay[];
  videoInfo?: TitleClass;
};

type ContentClass = {
  simpleText?: string;
};

type LengthTextClass = {
  accessibility?: ToggledAccessibilityDataClass;
  simpleText?: string;
};

type ToggledAccessibilityDataClass = {
  accessibilityData?: AccessibilityContextClass;
};

type AccessibilityContextClass = {
  label?: string;
};

type PlaylistVideoRendererMenu = {
  menuRenderer?: PurpleMenuRenderer;
};

type PurpleMenuRenderer = {
  items?: PurpleItem[];
  trackingParams?: string;
  accessibility?: ToggledAccessibilityDataClass;
};

type PurpleItem = {
  menuServiceItemRenderer?: MenuServiceItemRenderer;
  menuNavigationItemRenderer?: PurpleMenuNavigationItemRenderer;
};

type PurpleMenuNavigationItemRenderer = {
  text?: TitleClass;
  icon?: IconImage;
  navigationEndpoint?: PurpleNavigationEndpoint;
  trackingParams?: string;
};

type IconImage = {
  iconType?: string;
};

type PurpleNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  signInEndpoint?: PurpleSignInEndpoint;
};

type VideoCommandCommandMetadata = {
  webCommandMetadata?: FluffyWebCommandMetadata;
};

type FluffyWebCommandMetadata = {
  url?: string;
  webPageType?: WebPageType;
  rootVe?: number;
  apiUrl?: APIURL;
  sendPost?: boolean;
};

type WebPageType =
  | "WEB_PAGE_TYPE_UNKNOWN"
  | "WEB_PAGE_TYPE_WATCH"
  | "WEB_PAGE_TYPE_CHANNEL"
  | "WEB_PAGE_TYPE_PLAYLIST"
  | "WEB_PAGE_TYPE_BROWSE"
  | "WEB_PAGE_TYPE_SEARCH";

type PurpleSignInEndpoint = {
  nextEndpoint?: NextEndpoint;
};

type NextEndpoint = {
  clickTrackingParams?: string;
  showSheetCommand?: NextEndpointShowSheetCommand;
};

type NextEndpointShowSheetCommand = {
  panelLoadingStrategy?: PurplePanelLoadingStrategy;
};

type PurplePanelLoadingStrategy = {
  requestTemplate?: RequestTemplate;
};

type RequestTemplate = {
  panelId?: PanelID;
  params?: string;
};

type PanelID = "PAadd_to_playlist";

type TitleClass = {
  runs?: TextRun[];
};

type TextRun = {
  text?: string;
};

type MenuServiceItemRenderer = {
  text?: TitleClass;
  icon?: IconImage;
  serviceEndpoint?: ServiceEndpoint;
  trackingParams?: string;
  hasSeparator?: boolean;
};

type ServiceEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  signalServiceEndpoint?: ServiceEndpointSignalServiceEndpoint;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
};

type ShareEntityServiceEndpoint = {
  serializedShareEntity?: string;
  commands?: CommandElement[];
};

type CommandElement = {
  clickTrackingParams?: string;
  openPopupAction?: CommandOpenPopupAction;
};

type CommandOpenPopupAction = {
  popup?: PurplePopup;
  popupType?: PopupType;
  beReused?: boolean;
};

type PurplePopup = {
  unifiedSharePanelRenderer?: UnifiedSharePanelRenderer;
};

type UnifiedSharePanelRenderer = {
  trackingParams?: string;
  showLoadingSpinner?: boolean;
};

type PopupType = "DIALOG";

type ServiceEndpointSignalServiceEndpoint = {
  signal?: Signal;
  actions?: PurpleAction[];
};

type PurpleAction = {
  clickTrackingParams?: string;
  addToPlaylistCommand?: AddToPlaylistCommand;
};

type AddToPlaylistCommand = {
  openMiniplayer?: boolean;
  videoId?: string;
  listType?: ListType;
  onCreateListCommand?: OnCreateListCommand;
  videoIds?: string[];
  videoCommand?: VideoCommand;
};

type ListType = "PLAYLIST_EDIT_LIST_TYPE_QUEUE";

type OnCreateListCommand = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  createPlaylistServiceEndpoint?: CreatePlaylistServiceEndpoint;
};

type CreatePlaylistServiceEndpoint = {
  videoIds?: string[];
  params?: CreatePlaylistServiceEndpointParams;
};

type CreatePlaylistServiceEndpointParams = "CAQ%3D";

type VideoCommand = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  watchEndpoint?: VideoCommandWatchEndpoint;
};

type VideoCommandWatchEndpoint = {
  videoId?: string;
  watchEndpointSupportedOnesieConfig?: WatchEndpointSupportedOnesieConfig;
  playerParams?: string;
};

type WatchEndpointSupportedOnesieConfig = {
  html5PlaybackOnesieConfig?: Html5PlaybackOnesieConfig;
};

type Html5PlaybackOnesieConfig = {
  commonConfig?: CommonConfig;
};

type CommonConfig = {
  url?: string;
};

type Signal = "CLIENT_SIGNAL";

type PlaylistVideoRendererNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  watchEndpoint?: NavigationEndpointWatchEndpoint;
};

type NavigationEndpointWatchEndpoint = {
  videoId?: string;
  playlistId?: TID;
  index?: number;
  params?: WatchEndpointParams;
  playerParams?: PlayerParams;
  loggingContext?: WatchEndpointLoggingContext;
  watchEndpointSupportedOnesieConfig?: WatchEndpointSupportedOnesieConfig;
};

type WatchEndpointLoggingContext = {
  vssLoggingContext?: VssLoggingContext;
};

type VssLoggingContext = {
  serializedContextData?: SerializedContextData;
};

type SerializedContextData = "GiJQTGNTc1RPUlZGRVRNSEc4OF9ZbDhNYm1NamE5Rzg1dVJX";

type WatchEndpointParams = "OAI%3D" | "CIAbIAE%3D" | "CLsXIAM%3D";

type PlayerParams = "iAQB" | "iAQB0gcJCTgLAYcqIYzv";

type TID = "PLcSsTORVFETMHG88_Yl8MbmMja9G85uRW";

type ShortBylineTextClass = {
  runs?: ShortBylineTextRun[];
};

type ShortBylineTextRun = {
  text?: TextEnum;
  navigationEndpoint?: VideoOwnerRendererNavigationEndpoint;
};

type VideoOwnerRendererNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  browseEndpoint?: NavigationEndpointBrowseEndpoint;
};

type NavigationEndpointBrowseEndpoint = {
  browseId?: BrowseID;
  canonicalBaseUrl?: CanonicalBaseURL;
};

type BrowseID = "UCpaVqy1txXNoxFamEWlOBMg";

type CanonicalBaseURL = "/@dancejamproductions";

type TextEnum = "Dance Jam Productions";

type PlaylistVideoRendererThumbnail = {
  thumbnails?: ThumbnailElement[];
};

type ThumbnailElement = {
  url?: string;
  width?: number;
  height?: number;
};

type PlaylistVideoRendererThumbnailOverlay = {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
};

type ThumbnailOverlayNowPlayingRenderer = {
  text?: TitleClass;
};

type ThumbnailOverlayTimeStatusRenderer = {
  text?: LengthTextClass;
  style?: StyleEnum;
};

type StyleEnum = "DEFAULT";

type PurpleTitle = {
  runs?: TextRun[];
  accessibility?: ToggledAccessibilityDataClass;
};

type YoutubePlaylistInitialDataHeader = {
  pageHeaderRenderer?: PageHeaderRenderer;
};

type PageHeaderRenderer = {
  pageTitle?: string;
  content?: PageHeaderRendererContent;
  enableSidebarView?: boolean;
};

type PageHeaderRendererContent = {
  pageHeaderViewModel?: PageHeaderViewModel;
};

type PageHeaderViewModel = {
  title?: PageHeaderViewModelTitle;
  metadata?: PageHeaderViewModelMetadata;
  actions?: Actions;
  description?: PageHeaderViewModelDescription;
  heroImage?: HeroImage;
  background?: Background;
  hasTopbarAnimation?: boolean;
  enableFlexibleActionsButtonsWrapper?: boolean;
  rendererContext?: ContentMetadataViewModelRendererContext;
};

type Actions = {
  flexibleActionsViewModel?: FlexibleActionsViewModel;
};

type FlexibleActionsViewModel = {
  actionsRows?: ActionsRow[];
  justifyContent?: string;
  minimumRowHeight?: number;
  rendererContext?: FlexibleActionsViewModelRendererContext;
};

type ActionsRow = {
  actions?: ActionsRowAction[];
};

type ActionsRowAction = {
  buttonViewModel?: ActionButtonViewModel;
  toggleButtonViewModel?: ToggleButtonViewModel;
};

type ActionButtonViewModel = {
  iconName?: string;
  title?: string;
  onTap?: PurpleOnTap;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
  buttonSize?: string;
  tooltip?: string;
  state?: string;
  enableIconButton?: boolean;
};

type PurpleOnTap = {
  innertubeCommand?: PurpleInnertubeCommand;
};

type PurpleInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  watchEndpoint?: NavigationEndpointWatchEndpoint;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
  showSheetCommand?: InnertubeCommandShowSheetCommand;
};

type InnertubeCommandShowSheetCommand = {
  panelLoadingStrategy?: FluffyPanelLoadingStrategy;
};

type FluffyPanelLoadingStrategy = {
  inlineContent?: PurpleInlineContent;
};

type PurpleInlineContent = {
  sheetViewModel?: SheetViewModel;
};

type SheetViewModel = {
  content?: SheetViewModelContent;
};

type SheetViewModelContent = {
  listViewModel?: ListViewModel;
};

type ListViewModel = {
  listItems?: ListItem[];
};

type ListItem = {
  listItemViewModel?: ListItemViewModel;
};

type ListItemViewModel = {
  title?: HeadlineClass;
  leadingImage?: Icon;
  rendererContext?: ListItemViewModelRendererContext;
};

type Icon = {
  sources?: Source[];
};

type Source = {
  clientResource?: ClientResource;
};

type ClientResource = {
  imageName?: string;
};

type ListItemViewModelRendererContext = {
  loggingContext?: PurpleLoggingContext;
  commandContext?: PurpleCommandContext;
};

type PurpleCommandContext = {
  onTap?: FluffyOnTap;
};

type FluffyOnTap = {
  innertubeCommand?: PlaylistVideoRendererNavigationEndpoint;
};

type PurpleLoggingContext = {
  loggingDirectives?: PurpleLoggingDirectives;
};

type PurpleLoggingDirectives = {
  trackingParams?: string;
  visibility?: Visibility;
};

type Visibility = {
  types?: string;
};

type HeadlineClass = {
  content?: string;
};

type ToggleButtonViewModel = {
  defaultButtonViewModel?: ButtonViewModel;
  toggledButtonViewModel?: ButtonViewModel;
  isToggled?: boolean;
  identifier?: string;
  trackingParams?: string;
};

type ButtonViewModel = {
  buttonViewModel?: DefaultButtonViewModelButtonViewModel;
};

type DefaultButtonViewModelButtonViewModel = {
  iconName?: string;
  onTap?: TentacledOnTap;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
  buttonSize?: string;
  tooltip?: string;
};

type TentacledOnTap = {
  innertubeCommand?: DefaultNavigationEndpoint;
};

type DefaultNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: DefaultNavigationEndpointCommandMetadata;
  modalEndpoint?: DefaultNavigationEndpointModalEndpoint;
};

type DefaultNavigationEndpointCommandMetadata = {
  webCommandMetadata?: TentacledWebCommandMetadata;
};

type TentacledWebCommandMetadata = {
  ignoreNavigation?: boolean;
};

type DefaultNavigationEndpointModalEndpoint = {
  modal?: PurpleModal;
};

type PurpleModal = {
  modalWithTitleAndButtonRenderer?: PurpleModalWithTitleAndButtonRenderer;
};

type PurpleModalWithTitleAndButtonRenderer = {
  title?: ContentClass;
  content?: ContentClass;
  button?: PurpleButton;
};

type PurpleButton = {
  buttonRenderer?: PurpleButtonRenderer;
};

type PurpleButtonRenderer = {
  style?: string;
  size?: string;
  isDisabled?: boolean;
  text?: ContentClass;
  navigationEndpoint?: FluffyNavigationEndpoint;
  trackingParams?: string;
};

type FluffyNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  signInEndpoint?: FluffySignInEndpoint;
};

type FluffySignInEndpoint = {
  nextEndpoint?: Endpoint;
  idamTag?: string;
};

type Endpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  browseEndpoint?: EndpointBrowseEndpoint;
};

type EndpointBrowseEndpoint = {
  browseId?: string;
};

type FlexibleActionsViewModelRendererContext = {
  loggingContext?: FluffyLoggingContext;
};

type FluffyLoggingContext = {
  loggingDirectives?: FluffyLoggingDirectives;
};

type FluffyLoggingDirectives = {
  trackingParams?: string;
  visibility?: Visibility;
  clientVeSpec?: ClientVeSpec;
};

type ClientVeSpec = {
  uiType?: number;
  veCounter?: number;
};

type Background = {
  cinematicContainerViewModel?: CinematicContainerViewModel;
};

type CinematicContainerViewModel = {
  backgroundImageConfig?: BackgroundImageConfig;
  gradientColorConfig?: GradientColorConfig[];
  config?: CinematicContainerViewModelConfig;
};

type BackgroundImageConfig = {
  image?: BackgroundImageConfigImage;
};

type BackgroundImageConfigImage = {
  sources?: ThumbnailElement[];
};

type CinematicContainerViewModelConfig = {
  lightThemeBackgroundColor?: number;
  darkThemeBackgroundColor?: number;
  colorSourceSizeMultiplier?: number;
  applyClientImageBlur?: boolean;
};

type GradientColorConfig = {
  lightThemeColor?: number;
  darkThemeColor?: number;
  startLocation?: number;
};

type PageHeaderViewModelDescription = {
  descriptionPreviewViewModel?: DescriptionPreviewViewModel;
};

type DescriptionPreviewViewModel = {
  description?: HeadlineClass;
  truncationText?: TruncationText;
  rendererContext?: DescriptionPreviewViewModelRendererContext;
};

type DescriptionPreviewViewModelRendererContext = {
  loggingContext?: PurpleLoggingContext;
  accessibilityContext?: AccessibilityContextClass;
  commandContext?: FluffyCommandContext;
};

type FluffyCommandContext = {
  onTap?: StickyOnTap;
};

type StickyOnTap = {
  innertubeCommand?: FluffyInnertubeCommand;
};

type FluffyInnertubeCommand = {
  clickTrackingParams?: string;
  showEngagementPanelEndpoint?: ShowEngagementPanelEndpoint;
};

type ShowEngagementPanelEndpoint = {
  engagementPanel?: EngagementPanel;
  identifier?: Identifier;
  engagementPanelPresentationConfigs?: EngagementPanelPresentationConfigs;
};

type EngagementPanel = {
  engagementPanelSectionListRenderer?: EngagementPanelSectionListRenderer;
};

type EngagementPanelSectionListRenderer = {
  header?: EngagementPanelSectionListRendererHeader;
  content?: EngagementPanelSectionListRendererContent;
  targetId?: string;
  identifier?: Identifier;
};

type EngagementPanelSectionListRendererContent = {
  sectionListRenderer?: FluffySectionListRenderer;
};

type FluffySectionListRenderer = {
  contents?: TentacledContent[];
  trackingParams?: string;
};

type TentacledContent = {
  itemSectionRenderer?: FluffyItemSectionRenderer;
};

type FluffyItemSectionRenderer = {
  contents?: StickyContent[];
  trackingParams?: string;
};

type StickyContent = {
  messageRenderer?: MessageRenderer;
};

type MessageRenderer = {
  text?: TitleClass;
  trackingParams?: string;
  style?: MessageRendererStyle;
};

type MessageRendererStyle = {
  value?: string;
};

type EngagementPanelSectionListRendererHeader = {
  engagementPanelTitleHeaderRenderer?: EngagementPanelTitleHeaderRenderer;
};

type EngagementPanelTitleHeaderRenderer = {
  title?: TitleClass;
  visibilityButton?: VisibilityButton;
  trackingParams?: string;
};

type VisibilityButton = {
  buttonRenderer?: VisibilityButtonButtonRenderer;
};

type VisibilityButtonButtonRenderer = {
  icon?: IconImage;
  trackingParams?: string;
  accessibilityData?: ToggledAccessibilityDataClass;
  command?: PurpleCommand;
};

type PurpleCommand = {
  clickTrackingParams?: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
};

type ChangeEngagementPanelVisibilityAction = {
  targetId?: string;
  visibility?: string;
};

type Identifier = {
  surface?: string;
  tag?: string;
};

type EngagementPanelPresentationConfigs = {
  engagementPanelPopupPresentationConfig?: EngagementPanelPopupPresentationConfig;
};

type EngagementPanelPopupPresentationConfig = {
  popupType?: string;
};

type TruncationText = {
  content?: string;
  styleRuns?: TruncationTextStyleRun[];
};

type TruncationTextStyleRun = {
  startIndex?: number;
  length?: number;
  weight?: number;
};

type HeroImage = {
  contentPreviewImageViewModel?: ContentPreviewImageViewModel;
};

type ContentPreviewImageViewModel = {
  image?: BackgroundImageConfigImage;
  style?: string;
  layoutMode?: string;
  overlays?: Overlay[];
  rendererContext?: ContentPreviewImageViewModelRendererContext;
};

type Overlay = {
  thumbnailHoverOverlayViewModel?: ThumbnailHoverOverlayViewModel;
};

type ThumbnailHoverOverlayViewModel = {
  icon?: Icon;
  text?: ThumbnailHoverOverlayViewModelText;
  style?: string;
  rendererContext?: ThumbnailHoverOverlayViewModelRendererContext;
};

type ThumbnailHoverOverlayViewModelRendererContext = {
  commandContext?: PurpleCommandContext;
};

type ThumbnailHoverOverlayViewModelText = {
  content?: string;
  styleRuns?: PurpleStyleRun[];
};

type PurpleStyleRun = {
  startIndex?: number;
  length?: number;
};

type ContentPreviewImageViewModelRendererContext = {
  loggingContext?: PurpleLoggingContext;
  accessibilityContext?: AccessibilityContextClass;
};

type PageHeaderViewModelMetadata = {
  contentMetadataViewModel?: ContentMetadataViewModel;
};

type ContentMetadataViewModel = {
  metadataRows?: MetadataRow[];
  delimiter?: string;
  rendererContext?: ContentMetadataViewModelRendererContext;
};

type MetadataRow = {
  metadataParts?: MetadataPart[];
};

type MetadataPart = {
  avatarStack?: AvatarStack;
  text?: HeadlineClass;
};

type AvatarStack = {
  avatarStackViewModel?: AvatarStackViewModel;
};

type AvatarStackViewModel = {
  avatars?: Avatar[];
  text?: AvatarStackViewModelText;
  rendererContext?: AvatarStackViewModelRendererContext;
};

type Avatar = {
  avatarViewModel?: AvatarViewModel;
};

type AvatarViewModel = {
  image?: AvatarViewModelImage;
  avatarImageSize?: string;
};

type AvatarViewModelImage = {
  sources?: ThumbnailElement[];
  processor?: Processor;
};

type Processor = {
  borderImageProcessor?: BorderImageProcessor;
};

type BorderImageProcessor = {
  circular?: boolean;
};

type AvatarStackViewModelRendererContext = {
  loggingContext?: PurpleLoggingContext;
  accessibilityContext?: AccessibilityContextClass;
  commandContext?: TentacledCommandContext;
};

type TentacledCommandContext = {
  onTap?: CommandRunOnTap;
};

type CommandRunOnTap = {
  innertubeCommand?: VideoOwnerRendererNavigationEndpoint;
};

type AvatarStackViewModelText = {
  content?: string;
  commandRuns?: CommandRun[];
  styleRuns?: FluffyStyleRun[];
};

type CommandRun = {
  startIndex?: number;
  length?: number;
  onTap?: CommandRunOnTap;
};

type FluffyStyleRun = {
  startIndex?: number;
  length?: number;
  fontColor?: number;
  weightLabel?: string;
};

type ContentMetadataViewModelRendererContext = {
  loggingContext?: PurpleLoggingContext;
};

type PageHeaderViewModelTitle = {
  dynamicTextViewModel?: DynamicTextViewModel;
};

type DynamicTextViewModel = {
  text?: HeadlineClass;
  rendererContext?: ContentMetadataViewModelRendererContext;
};

type YoutubePlaylistInitialDataMetadata = {
  playlistMetadataRenderer?: PlaylistMetadataRenderer;
};

type PlaylistMetadataRenderer = {
  title?: string;
  description?: string;
  androidAppindexingLink?: string;
  iosAppindexingLink?: string;
};

type Microformat = {
  microformatDataRenderer?: MicroformatDataRenderer;
};

type MicroformatDataRenderer = {
  urlCanonical?: string;
  title?: string;
  description?: string;
  thumbnail?: MicroformatDataRendererThumbnail;
  siteName?: string;
  appName?: string;
  androidPackage?: string;
  iosAppStoreId?: string;
  iosAppArguments?: string;
  ogType?: string;
  urlApplinksWeb?: string;
  urlApplinksIos?: string;
  urlApplinksAndroid?: string;
  urlTwitterIos?: string;
  urlTwitterAndroid?: string;
  twitterCardType?: string;
  twitterSiteHandle?: string;
  schemaDotOrgType?: string;
  noindex?: boolean;
  unlisted?: boolean;
  linkAlternates?: LinkAlternate[];
};

type LinkAlternate = {
  hrefUrl?: string;
};

type MicroformatDataRendererThumbnail = {
  thumbnails?: ThumbnailElement[];
  sampledThumbnailColor?: SampledThumbnailColor;
  darkColorPalette?: DarkColorPalette;
  vibrantColorPalette?: VibrantColorPalette;
};

type DarkColorPalette = {
  section2Color?: number;
  iconInactiveColor?: number;
  iconDisabledColor?: number;
};

type SampledThumbnailColor = {
  red?: number;
  green?: number;
  blue?: number;
};

type VibrantColorPalette = {
  iconInactiveColor?: number;
};

type ResponseContext = {
  serviceTrackingParams?: ServiceTrackingParam[];
  mainAppWebResponseContext?: MainAppWebResponseContext;
  responseId?: string;
  webResponseContextExtensionData?: WebResponseContextExtensionData;
};

type MainAppWebResponseContext = {
  loggedOut?: boolean;
  trackingParam?: string;
};

type ServiceTrackingParam = {
  service?: string;
  params?: Param[];
};

type Param = {
  key?: string;
  value?: string;
};

type WebResponseContextExtensionData = {
  webResponseContextPreloadData?: WebResponseContextPreloadData;
  ytConfigData?: YtConfigData;
  hasDecorated?: boolean;
};

type WebResponseContextPreloadData = {
  preloadMessageNames?: string[];
};

type YtConfigData = {
  visitorData?: string;
  rootVisualElementType?: number;
};

type Sidebar = {
  playlistSidebarRenderer?: PlaylistSidebarRenderer;
};

type PlaylistSidebarRenderer = {
  items?: PlaylistSidebarRendererItem[];
  trackingParams?: string;
};

type PlaylistSidebarRendererItem = {
  playlistSidebarPrimaryInfoRenderer?: PlaylistSidebarPrimaryInfoRenderer;
  playlistSidebarSecondaryInfoRenderer?: PlaylistSidebarSecondaryInfoRenderer;
};

type PlaylistSidebarPrimaryInfoRenderer = {
  thumbnailRenderer?: ThumbnailRenderer;
  title?: PlaylistSidebarPrimaryInfoRendererTitle;
  stats?: Stat[];
  menu?: PlaylistSidebarPrimaryInfoRendererMenu;
  thumbnailOverlays?: PlaylistSidebarPrimaryInfoRendererThumbnailOverlay[];
  navigationEndpoint?: PlaylistVideoRendererNavigationEndpoint;
  description?: ContentClass;
  showMoreText?: TitleClass;
};

type PlaylistSidebarPrimaryInfoRendererMenu = {
  menuRenderer?: FluffyMenuRenderer;
};

type FluffyMenuRenderer = {
  items?: FluffyItem[];
  trackingParams?: string;
  topLevelButtons?: TopLevelButton[];
  accessibility?: ToggledAccessibilityDataClass;
};

type FluffyItem = {
  menuNavigationItemRenderer?: FluffyMenuNavigationItemRenderer;
};

type FluffyMenuNavigationItemRenderer = {
  text?: ContentClass;
  icon?: IconImage;
  navigationEndpoint?: TentacledNavigationEndpoint;
  trackingParams?: string;
};

type TentacledNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: DefaultNavigationEndpointCommandMetadata;
  modalEndpoint?: PurpleModalEndpoint;
};

type PurpleModalEndpoint = {
  modal?: FluffyModal;
};

type FluffyModal = {
  modalWithTitleAndButtonRenderer?: FluffyModalWithTitleAndButtonRenderer;
};

type FluffyModalWithTitleAndButtonRenderer = {
  title?: ContentClass;
  content?: ContentClass;
  button?: A11YSkipNavigationButtonClass;
};

type A11YSkipNavigationButtonClass = {
  buttonRenderer?: A11YSkipNavigationButtonButtonRenderer;
};

type A11YSkipNavigationButtonButtonRenderer = {
  style?: string;
  size?: string;
  isDisabled?: boolean;
  text?: TitleClass;
  navigationEndpoint?: StickyNavigationEndpoint;
  trackingParams?: string;
  command?: FluffyCommand;
};

type FluffyCommand = {
  clickTrackingParams?: string;
  commandMetadata?: CommandCommandMetadata;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
};

type CommandCommandMetadata = {
  webCommandMetadata?: StickyWebCommandMetadata;
};

type StickyWebCommandMetadata = {
  sendPost?: boolean;
};

type CommandSignalServiceEndpoint = {
  signal?: Signal;
  actions?: FluffyAction[];
};

type FluffyAction = {
  clickTrackingParams?: string;
  signalAction?: SignalAction;
};

type SignalAction = {
  signal?: string;
};

type StickyNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  signInEndpoint?: TentacledSignInEndpoint;
};

type TentacledSignInEndpoint = {
  nextEndpoint?: Endpoint;
};

type TopLevelButton = {
  toggleButtonRenderer?: ToggleButtonRenderer;
  buttonRenderer?: TopLevelButtonButtonRenderer;
};

type TopLevelButtonButtonRenderer = {
  style?: string;
  size?: string;
  isDisabled?: boolean;
  icon?: IconImage;
  navigationEndpoint?: PlaylistVideoRendererNavigationEndpoint;
  accessibility?: AccessibilityContextClass;
  tooltip?: string;
  trackingParams?: string;
  serviceEndpoint?: ServiceEndpoint;
};

type ToggleButtonRenderer = {
  style?: ToggleButtonRendererStyle;
  size?: Size;
  isToggled?: boolean;
  isDisabled?: boolean;
  defaultIcon?: IconImage;
  toggledIcon?: IconImage;
  trackingParams?: string;
  defaultTooltip?: string;
  toggledTooltip?: string;
  defaultNavigationEndpoint?: DefaultNavigationEndpoint;
  accessibilityData?: ToggledAccessibilityDataClass;
  toggledAccessibilityData?: ToggledAccessibilityDataClass;
};

type Size = {
  sizeType?: string;
};

type ToggleButtonRendererStyle = {
  styleType?: string;
};

type Stat = {
  runs?: TextRun[];
  simpleText?: string;
};

type PlaylistSidebarPrimaryInfoRendererThumbnailOverlay = {
  thumbnailOverlaySidePanelRenderer?: ThumbnailOverlaySidePanelRenderer;
};

type ThumbnailOverlaySidePanelRenderer = {
  text?: ContentClass;
  icon?: IconImage;
};

type ThumbnailRenderer = {
  playlistVideoThumbnailRenderer?: PlaylistVideoThumbnailRenderer;
};

type PlaylistVideoThumbnailRenderer = {
  thumbnail?: PlaylistVideoRendererThumbnail;
  trackingParams?: string;
};

type PlaylistSidebarPrimaryInfoRendererTitle = {
  runs?: PurpleRun[];
};

type PurpleRun = {
  text?: string;
  navigationEndpoint?: PlaylistVideoRendererNavigationEndpoint;
};

type PlaylistSidebarSecondaryInfoRenderer = {
  videoOwner?: VideoOwner;
  button?: DismissButtonClass;
};

type DismissButtonClass = {
  buttonRenderer?: DismissButtonButtonRenderer;
};

type DismissButtonButtonRenderer = {
  style?: string;
  size?: string;
  isDisabled?: boolean;
  text?: TitleClass;
  navigationEndpoint?: IndigoNavigationEndpoint;
  trackingParams?: string;
};

type IndigoNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: DefaultNavigationEndpointCommandMetadata;
  modalEndpoint?: FluffyModalEndpoint;
};

type FluffyModalEndpoint = {
  modal?: TentacledModal;
};

type TentacledModal = {
  modalWithTitleAndButtonRenderer?: TentacledModalWithTitleAndButtonRenderer;
};

type TentacledModalWithTitleAndButtonRenderer = {
  title?: ContentClass;
  content?: ContentClass;
  button?: FluffyButton;
};

type FluffyButton = {
  buttonRenderer?: FluffyButtonRenderer;
};

type FluffyButtonRenderer = {
  style?: string;
  size?: string;
  isDisabled?: boolean;
  text?: ContentClass;
  navigationEndpoint?: IndecentNavigationEndpoint;
  trackingParams?: string;
};

type IndecentNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  signInEndpoint?: StickySignInEndpoint;
};

type StickySignInEndpoint = {
  nextEndpoint?: Endpoint;
  continueAction?: string;
  idamTag?: string;
};

type VideoOwner = {
  videoOwnerRenderer?: VideoOwnerRenderer;
};

type VideoOwnerRenderer = {
  thumbnail?: PlaylistVideoRendererThumbnail;
  title?: ShortBylineTextClass;
  navigationEndpoint?: VideoOwnerRendererNavigationEndpoint;
  trackingParams?: string;
};

type Topbar = {
  desktopTopbarRenderer?: DesktopTopbarRenderer;
};

type DesktopTopbarRenderer = {
  logo?: Logo;
  searchbox?: Searchbox;
  trackingParams?: string;
  countryCode?: string;
  topbarButtons?: TopbarButton[];
  hotkeyDialog?: HotkeyDialog;
  backButton?: Button;
  forwardButton?: Button;
  a11ySkipNavigationButton?: A11YSkipNavigationButtonClass;
};

type Button = {
  buttonRenderer?: BackButtonButtonRenderer;
};

type BackButtonButtonRenderer = {
  trackingParams?: string;
  command?: FluffyCommand;
};

type HotkeyDialog = {
  hotkeyDialogRenderer?: HotkeyDialogRenderer;
};

type HotkeyDialogRenderer = {
  title?: TitleClass;
  sections?: Section[];
  dismissButton?: DismissButtonClass;
  trackingParams?: string;
};

type Section = {
  hotkeyDialogSectionRenderer?: HotkeyDialogSectionRenderer;
};

type HotkeyDialogSectionRenderer = {
  title?: TitleClass;
  options?: Option[];
};

type Option = {
  hotkeyDialogSectionOptionRenderer?: HotkeyDialogSectionOptionRenderer;
};

type HotkeyDialogSectionOptionRenderer = {
  label?: TitleClass;
  hotkey?: string;
  hotkeyAccessibilityLabel?: ToggledAccessibilityDataClass;
};

type Logo = {
  topbarLogoRenderer?: TopbarLogoRenderer;
};

type TopbarLogoRenderer = {
  iconImage?: IconImage;
  tooltipText?: TitleClass;
  endpoint?: Endpoint;
  trackingParams?: string;
  overrideEntityKey?: string;
};

type Searchbox = {
  fusionSearchboxRenderer?: FusionSearchboxRenderer;
};

type FusionSearchboxRenderer = {
  icon?: IconImage;
  placeholderText?: TitleClass;
  config?: FusionSearchboxRendererConfig;
  trackingParams?: string;
  searchEndpoint?: FusionSearchboxRendererSearchEndpoint;
  clearButton?: ClearButton;
  showImageSourceDialog?: ShowImageSourceDialog;
};

type ClearButton = {
  buttonRenderer?: ClearButtonButtonRenderer;
};

type ClearButtonButtonRenderer = {
  style?: string;
  size?: string;
  isDisabled?: boolean;
  icon?: IconImage;
  trackingParams?: string;
  accessibilityData?: ToggledAccessibilityDataClass;
};

type FusionSearchboxRendererConfig = {
  webSearchboxConfig?: WebSearchboxConfig;
};

type WebSearchboxConfig = {
  requestLanguage?: string;
  requestDomain?: string;
  hasOnscreenKeyboard?: boolean;
  focusSearchbox?: boolean;
};

type FusionSearchboxRendererSearchEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  searchEndpoint?: SearchEndpointSearchEndpoint;
};

type SearchEndpointSearchEndpoint = {
  query?: string;
};

type ShowImageSourceDialog = {
  clickTrackingParams?: string;
  showDialogCommand?: ShowDialogCommand;
};

type ShowDialogCommand = {
  panelLoadingStrategy?: ShowDialogCommandPanelLoadingStrategy;
};

type ShowDialogCommandPanelLoadingStrategy = {
  inlineContent?: FluffyInlineContent;
};

type FluffyInlineContent = {
  dialogViewModel?: DialogViewModel;
};

type DialogViewModel = {
  header?: DialogViewModelHeader;
  footer?: Footer;
  content?: DialogViewModelContent;
};

type DialogViewModelContent = {
  basicContentViewModel?: BasicContentViewModel;
};

type BasicContentViewModel = {
  paragraphs?: Paragraph[];
};

type Paragraph = {
  text?: HeadlineClass;
};

type Footer = {
  panelFooterViewModel?: PanelFooterViewModel;
};

type PanelFooterViewModel = {
  primaryButton?: AryButton;
  secondaryButton?: AryButton;
  shouldHideDivider?: boolean;
};

type AryButton = {
  buttonViewModel?: PrimaryButtonButtonViewModel;
};

type PrimaryButtonButtonViewModel = {
  title?: string;
  style?: string;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
};

type DialogViewModelHeader = {
  dialogHeaderViewModel?: DialogHeaderViewModel;
};

type DialogHeaderViewModel = {
  headline?: HeadlineClass;
};

type TopbarButton = {
  topbarMenuButtonRenderer?: TopbarMenuButtonRenderer;
  buttonRenderer?: TopbarButtonButtonRenderer;
};

type TopbarButtonButtonRenderer = {
  style?: string;
  size?: string;
  text?: TitleClass;
  icon?: IconImage;
  navigationEndpoint?: HilariousNavigationEndpoint;
  trackingParams?: string;
  targetId?: string;
};

type HilariousNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: VideoCommandCommandMetadata;
  signInEndpoint?: IndigoSignInEndpoint;
};

type IndigoSignInEndpoint = {
  idamTag?: string;
};

type TopbarMenuButtonRenderer = {
  icon?: IconImage;
  menuRequest?: MenuRequest;
  trackingParams?: string;
  accessibility?: ToggledAccessibilityDataClass;
  tooltip?: string;
  style?: string;
};

type MenuRequest = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  signalServiceEndpoint?: MenuRequestSignalServiceEndpoint;
};

type MenuRequestSignalServiceEndpoint = {
  signal?: string;
  actions?: TentacledAction[];
};

type TentacledAction = {
  clickTrackingParams?: string;
  openPopupAction?: ActionOpenPopupAction;
};

type ActionOpenPopupAction = {
  popup?: FluffyPopup;
  popupType?: string;
  beReused?: boolean;
};

type FluffyPopup = {
  multiPageMenuRenderer?: MultiPageMenuRenderer;
};

type MultiPageMenuRenderer = {
  trackingParams?: string;
  style?: string;
  showLoadingSpinner?: boolean;
};
