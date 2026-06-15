export type YoutubeInitialData = {
  responseContext?: ResponseContext;
  contents?: Contents;
  currentVideoEndpoint?: CurrentVideoEndpoint;
  trackingParams?: string;
  playerOverlays?: PlayerOverlays;
  onResponseReceivedEndpoints?: OnResponseReceivedEndpoint[];
  engagementPanels?: EngagementPanel[];
  topbar?: Topbar;
  pageVisualEffects?: PageVisualEffect[];
  microformat?: Microformat;
  frameworkUpdates?: FrameworkUpdates;
};

type Contents = {
  twoColumnWatchNextResults?: TwoColumnWatchNextResults;
};

type TwoColumnWatchNextResults = {
  results?: TwoColumnWatchNextResultsResults;
  secondaryResults?: TwoColumnWatchNextResultsSecondaryResults;
  autoplay?: TwoColumnWatchNextResultsAutoplay;
};

type TwoColumnWatchNextResultsAutoplay = {
  autoplay?: AutoplayAutoplay;
};

type AutoplayAutoplay = {
  sets?: Set[];
  countDownSecs?: number;
  trackingParams?: string;
};

type Set = {
  mode?: string;
  autoplayVideo?: NavigationEndpointElement;
};

type NavigationEndpointElement = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  watchEndpoint?: AutoplayVideoWatchEndpoint;
};

type AutoplayVideoCommandMetadata = {
  webCommandMetadata?: PurpleWebCommandMetadata;
};

type PurpleWebCommandMetadata = {
  url?: string;
  webPageType?: WebPageType;
  rootVe?: number;
  apiUrl?: APIURL;
  sendPost?: boolean;
};

type APIURL =
  | "/youtubei/v1/browse"
  | "/youtubei/v1/share/get_share_panel"
  | "/youtubei/v1/like/dislike"
  | "/youtubei/v1/like/like";

type WebPageType =
  | "WEB_PAGE_TYPE_WATCH"
  | "WEB_PAGE_TYPE_BROWSE"
  | "WEB_PAGE_TYPE_UNKNOWN"
  | "WEB_PAGE_TYPE_CHANNEL"
  | "WEB_PAGE_TYPE_SEARCH";

type AutoplayVideoWatchEndpoint = {
  videoId?: string;
  params?: string;
  playerParams?: string;
  watchEndpointSupportedPrefetchConfig?: WatchEndpointSupportedPrefetchConfig;
};

type WatchEndpointSupportedPrefetchConfig = {
  prefetchHintConfig?: PrefetchHintConfig;
};

type PrefetchHintConfig = {
  prefetchPriority?: number;
  countdownUiRelativeSecondsPrefetchCondition?: number;
};

type TwoColumnWatchNextResultsResults = {
  results?: ResultsResults;
};

type ResultsResults = {
  contents?: ResultsContent[];
  trackingParams?: string;
};

type ResultsContent = {
  videoPrimaryInfoRenderer?: VideoPrimaryInfoRenderer;
  videoSecondaryInfoRenderer?: VideoSecondaryInfoRenderer;
  compositeVideoPrimaryInfoRenderer?: CompositeVideoPrimaryInfoRendererClass;
  itemSectionRenderer?: ContentItemSectionRenderer;
};

type CompositeVideoPrimaryInfoRendererClass = Record<string, unknown>;

type ContentItemSectionRenderer = {
  contents?: PurpleContent[];
  trackingParams?: string;
  header?: ItemSectionRendererHeader;
  sectionIdentifier?: string;
  targetId?: string;
};

type PurpleContent = {
  continuationItemRenderer?: PurpleContinuationItemRenderer;
};

type PurpleContinuationItemRenderer = {
  trigger?: string;
  continuationEndpoint?: PurpleContinuationEndpoint;
};

type PurpleContinuationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  continuationCommand?: ContinuationEndpointContinuationCommand;
};

type ContinuationEndpointCommandMetadata = {
  webCommandMetadata?: FluffyWebCommandMetadata;
};

type FluffyWebCommandMetadata = {
  sendPost?: boolean;
  apiUrl?: string;
};

type ContinuationEndpointContinuationCommand = {
  token?: string;
  request?: string;
};

type ItemSectionRendererHeader = {
  commentsHeaderRenderer?: CommentsHeaderRenderer;
};

type CommentsHeaderRenderer = {
  countText?: SubtitleElement;
  trackingParams?: string;
  screenReaderOnly?: boolean;
};

type SubtitleElement = {
  runs?: SubtitleRun[];
};

type SubtitleRun = {
  text?: string;
};

type VideoPrimaryInfoRenderer = {
  title?: SubtitleElement;
  viewCount?: ViewCount;
  videoActions?: VideoActions;
  trackingParams?: string;
  superTitleLink?: SuperTitleLink;
  dateText?: PauseText;
  relativeDateText?: ShortViewCountText;
};

type PauseText = {
  simpleText?: string;
};

type ShortViewCountText = {
  accessibility?: DisabledAccessibilityData;
  simpleText?: string;
};

type DisabledAccessibilityData = {
  accessibilityData?: Accessibility;
};

type Accessibility = {
  label?: string;
};

type SuperTitleLink = {
  runs?: SuperTitleLinkRun[];
};

type SuperTitleLinkRun = {
  text?: string;
  navigationEndpoint?: NavigationEndpointClass;
  loggingDirectives?: RunLoggingDirectives;
};

type RunLoggingDirectives = {
  trackingParams?: string;
  visibility?: Visibility;
};

type Visibility = {
  types?: string;
};

type NavigationEndpointClass = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  browseEndpoint?: CommandBrowseEndpoint;
};

type CommandBrowseEndpoint = {
  browseId?: ID;
  params?: string;
};

type ID = "FEhashtag" | "UCqjYq8sOZJ_xotabDH41clA";

type VideoActions = {
  menuRenderer?: VideoActionsMenuRenderer;
};

type VideoActionsMenuRenderer = {
  items?: PurpleItem[];
  trackingParams?: string;
  topLevelButtons?: TopLevelButtonElement[];
  accessibility?: DisabledAccessibilityData;
  flexibleItems?: FlexibleItem[];
};

type FlexibleItem = {
  menuFlexibleItemRenderer?: MenuFlexibleItemRenderer;
};

type MenuFlexibleItemRenderer = {
  menuItem?: MenuItemElement;
  topLevelButton?: MenuFlexibleItemRendererTopLevelButton;
};

type MenuItemElement = {
  menuServiceItemRenderer?: MenuItemRenderer;
};

type MenuItemRenderer = {
  text?: SubtitleElement;
  icon?: IconImageClass;
  serviceEndpoint?: ServiceEndpoint;
  trackingParams?: string;
  navigationEndpoint?: MenuNavigationItemRendererNavigationEndpoint;
};

type IconImageClass = {
  iconType?: string;
};

type MenuNavigationItemRendererNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signInEndpoint?: InnertubeCommandSignInEndpoint;
};

type InnertubeCommandSignInEndpoint = {
  nextEndpoint?: PurpleNextEndpoint;
};

type PurpleNextEndpoint = {
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

type PanelID = "PAadd_to_playlist" | "PApremium_upsell";

type ServiceEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: SignInEndpointCommandMetadata;
  modalEndpoint?: ServiceEndpointModalEndpoint;
  showEngagementPanelEndpoint?: ShowEngagementPanelEndpoint;
};

type SignInEndpointCommandMetadata = {
  webCommandMetadata?: TentacledWebCommandMetadata;
};

type TentacledWebCommandMetadata = {
  ignoreNavigation?: boolean;
};

type ServiceEndpointModalEndpoint = {
  modal?: PurpleModal;
};

type PurpleModal = {
  modalWithTitleAndButtonRenderer?: PurpleModalWithTitleAndButtonRenderer;
};

type PurpleModalWithTitleAndButtonRenderer = {
  title?: SubtitleElement;
  content?: SubtitleElement;
  button?: CustomizeButtonElement;
};

type CustomizeButtonElement = {
  buttonRenderer?: CustomizeButtonButtonRenderer;
};

type CustomizeButtonButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: PauseText;
  navigationEndpoint?: PurpleNavigationEndpoint;
  trackingParams?: string;
  command?: PurpleCommand;
};

type PurpleCommand = {
  clickTrackingParams?: string;
  commandMetadata?: PurpleCommandMetadata;
  userFeedbackEndpoint?: UserFeedbackEndpoint;
  urlEndpoint?: CommonConfig;
};

type PurpleCommandMetadata = {
  webCommandMetadata?: StickyWebCommandMetadata;
};

type StickyWebCommandMetadata = {
  ignoreNavigation?: boolean;
  url?: string;
  webPageType?: WebPageType;
  rootVe?: number;
};

type CommonConfig = {
  url?: string;
};

type UserFeedbackEndpoint = {
  additionalDatas?: AdditionalData[];
  bucketIdentifier?: string;
};

type AdditionalData = {
  userFeedbackEndpointProductSpecificValueData?: Param;
};

type Param = {
  key?: string;
  value?: string;
};

type PurpleNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signInEndpoint?: PurpleSignInEndpoint;
};

type PurpleSignInEndpoint = {
  nextEndpoint?: FluffyNextEndpoint;
  idamTag?: string;
};

type FluffyNextEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  watchEndpoint?: NextEndpointWatchEndpoint;
  likeEndpoint?: PurpleLikeEndpoint;
};

type PurpleLikeEndpoint = {
  status?: string;
  target?: TargetClass;
  dislikeParams?: string;
  likeParams?: string;
};

type TargetClass = {
  videoId?: VideoID;
};

type VideoID = "91EBb-XR2Cc";

type NextEndpointWatchEndpoint = {
  videoId?: string;
  watchEndpointSupportedOnesieConfig?: WatchEndpointSupportedOnesieConfig;
};

type WatchEndpointSupportedOnesieConfig = {
  html5PlaybackOnesieConfig?: Html5PlaybackOnesieConfig;
};

type Html5PlaybackOnesieConfig = {
  commonConfig?: CommonConfig;
};

type Size = "SIZE_DEFAULT";

type ShowEngagementPanelEndpoint = {
  identifier?: PanelIdentifierClass;
  globalConfiguration?: GetTranscriptEndpoint;
  engagementPanelPresentationConfigs?: EngagementPanelPresentationConfigs;
};

type EngagementPanelPresentationConfigs = {
  engagementPanelPopupPresentationConfig?: EngagementPanelPopupPresentationConfig;
};

type EngagementPanelPopupPresentationConfig = {
  popupType?: string;
};

type GetTranscriptEndpoint = {
  params?: string;
};

type PanelIdentifierClass = {
  tag?: string;
};

type MenuFlexibleItemRendererTopLevelButton = {
  buttonViewModel?: PurpleButtonViewModel;
};

type PurpleButtonViewModel = {
  iconName?: string;
  title?: string;
  onTap?: PurpleOnTap;
  accessibilityText?: string;
  style?: ButtonViewModelStyle;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
  buttonSize?: ButtonSize;
  tooltip?: string;
};

type ButtonSize = "BUTTON_VIEW_MODEL_SIZE_DEFAULT";

type PurpleOnTap = {
  serialCommand?: PurpleSerialCommand;
};

type PurpleSerialCommand = {
  commands?: FluffyCommand[];
};

type FluffyCommand = {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: ServiceEndpoint;
};

type LogGestureCommand = {
  gestureType?: GestureType;
  trackingParams?: string;
};

type GestureType = "GESTURE_EVENT_TYPE_LOG_GENERIC_CLICK";

type ButtonViewModelStyle = "BUTTON_VIEW_MODEL_STYLE_MONO";

type PurpleItem = {
  menuServiceItemRenderer?: PurpleMenuServiceItemRenderer;
};

type PurpleMenuServiceItemRenderer = {
  text?: SubtitleElement;
  icon?: IconImageClass;
  serviceEndpoint?: PurpleServiceEndpoint;
  trackingParams?: string;
};

type PurpleServiceEndpoint = {
  clickTrackingParams?: string;
  showEngagementPanelEndpoint?: ShowEngagementPanelEndpoint;
};

type TopLevelButtonElement = {
  segmentedLikeDislikeButtonViewModel?: SegmentedLikeDislikeButtonViewModel;
  buttonViewModel?: FluffyButtonViewModel;
};

type FluffyButtonViewModel = {
  iconName?: FluffyButtonViewModelIconName;
  title?: string;
  onTap?: FluffyOnTap;
  accessibilityText?: string;
  style?: ButtonViewModelStyle;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
  buttonSize?: ButtonSize;
  state?: StateEnum;
  accessibilityId?: string;
  tooltip?: string;
};

type FluffyButtonViewModelIconName =
  | "MUSIC"
  | "yt-sys-icons:chevron_right"
  | "ADD_TO_QUEUE_TAIL"
  | "BOOKMARK_BORDER"
  | "SHARE";

type FluffyOnTap = {
  serialCommand?: FluffySerialCommand;
};

type FluffySerialCommand = {
  commands?: TentacledCommand[];
};

type TentacledCommand = {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: CommandClass;
};

type CommandClass = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
};

type ShareEntityServiceEndpoint = {
  serializedShareEntity?: string;
  commands?: ShareEntityServiceEndpointCommand[];
};

type ShareEntityServiceEndpointCommand = {
  clickTrackingParams?: string;
  openPopupAction?: PurpleOpenPopupAction;
};

type PurpleOpenPopupAction = {
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

type StateEnum = "BUTTON_VIEW_MODEL_STATE_ACTIVE";

type SegmentedLikeDislikeButtonViewModel = {
  likeButtonViewModel?: SegmentedLikeDislikeButtonViewModelLikeButtonViewModel;
  dislikeButtonViewModel?: SegmentedLikeDislikeButtonViewModelDislikeButtonViewModel;
  iconType?: string;
  likeCountEntity?: VisibleOnLoad;
  dynamicLikeCountUpdateData?: DynamicLikeCountUpdateData;
  teasersOrderEntityKey?: string;
};

type SegmentedLikeDislikeButtonViewModelDislikeButtonViewModel = {
  dislikeButtonViewModel?: DislikeButtonViewModelDislikeButtonViewModel;
};

type DislikeButtonViewModelDislikeButtonViewModel = {
  toggleButtonViewModel?: DislikeButtonViewModelToggleButtonViewModel;
  dislikeEntityKey?: string;
};

type DislikeButtonViewModelToggleButtonViewModel = {
  toggleButtonViewModel?: PurpleToggleButtonViewModel;
};

type PurpleToggleButtonViewModel = {
  defaultButtonViewModel?: PurpleDefaultButtonViewModel;
  toggledButtonViewModel?: PurpleToggledButtonViewModel;
  trackingParams?: string;
  isTogglingDisabled?: boolean;
};

type PurpleDefaultButtonViewModel = {
  buttonViewModel?: TentacledButtonViewModel;
};

type TentacledButtonViewModel = {
  iconName?: string;
  title?: string;
  onTap?: TentacledOnTap;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
  buttonSize?: string;
  accessibilityId?: string;
  tooltip?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
};

type TentacledOnTap = {
  serialCommand?: TentacledSerialCommand;
};

type TentacledSerialCommand = {
  commands?: StickyCommand[];
};

type StickyCommand = {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: PurpleInnertubeCommand;
};

type PurpleInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: SignInEndpointCommandMetadata;
  modalEndpoint?: PurpleModalEndpoint;
};

type PurpleModalEndpoint = {
  modal?: FluffyModal;
};

type FluffyModal = {
  modalWithTitleAndButtonRenderer?: FluffyModalWithTitleAndButtonRenderer;
};

type FluffyModalWithTitleAndButtonRenderer = {
  title?: PauseText;
  content?: PauseText;
  button?: PurpleButton;
};

type PurpleButton = {
  buttonRenderer?: PurpleButtonRenderer;
};

type PurpleButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: PauseText;
  navigationEndpoint?: FluffyNavigationEndpoint;
  trackingParams?: string;
};

type FluffyNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signInEndpoint?: FluffySignInEndpoint;
};

type FluffySignInEndpoint = {
  nextEndpoint?: TentacledNextEndpoint;
  idamTag?: string;
};

type TentacledNextEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  likeEndpoint?: FluffyLikeEndpoint;
};

type FluffyLikeEndpoint = {
  status?: string;
  target?: TargetClass;
  dislikeParams?: string;
};

type TooltipData = {
  tooltipViewModel?: TooltipViewModel;
};

type TooltipViewModel = {
  tooltipText?: string;
  placement?: string;
  style?: string;
};

type PurpleToggledButtonViewModel = {
  buttonViewModel?: StickyButtonViewModel;
};

type StickyButtonViewModel = {
  iconName?: string;
  title?: string;
  onTap?: StickyOnTap;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
  buttonSize?: string;
  accessibilityId?: string;
  tooltip?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
};

type StickyOnTap = {
  serialCommand?: StickySerialCommand;
};

type StickySerialCommand = {
  commands?: IndigoCommand[];
};

type IndigoCommand = {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: FluffyInnertubeCommand;
};

type FluffyInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  likeEndpoint?: InnertubeCommandLikeEndpoint;
};

type InnertubeCommandLikeEndpoint = {
  status?: string;
  target?: TargetClass;
  removeLikeParams?: string;
};

type DynamicLikeCountUpdateData = {
  updateStatusKey?: string;
  placeholderLikeCountValuesKey?: string;
  updateDelayLoopId?: string;
  updateDelaySec?: number;
};

type SegmentedLikeDislikeButtonViewModelLikeButtonViewModel = {
  likeButtonViewModel?: LikeButtonViewModelLikeButtonViewModel;
};

type LikeButtonViewModelLikeButtonViewModel = {
  toggleButtonViewModel?: LikeButtonViewModelToggleButtonViewModel;
  likeStatusEntityKey?: string;
  likeStatusEntity?: LikeStatusEntity;
};

type LikeStatusEntity = {
  key?: string;
  likeStatus?: string;
};

type LikeButtonViewModelToggleButtonViewModel = {
  toggleButtonViewModel?: FluffyToggleButtonViewModel;
};

type FluffyToggleButtonViewModel = {
  defaultButtonViewModel?: FluffyDefaultButtonViewModel;
  toggledButtonViewModel?: PurpleToggledButtonViewModel;
  identifier?: string;
  trackingParams?: string;
  isTogglingDisabled?: boolean;
};

type FluffyDefaultButtonViewModel = {
  buttonViewModel?: IndigoButtonViewModel;
};

type IndigoButtonViewModel = {
  iconName?: string;
  title?: string;
  onTap?: IndigoOnTap;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
  buttonSize?: string;
  accessibilityId?: string;
  tooltip?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
};

type IndigoOnTap = {
  serialCommand?: IndigoSerialCommand;
};

type IndigoSerialCommand = {
  commands?: IndecentCommand[];
};

type IndecentCommand = {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: TentacledInnertubeCommand;
};

type TentacledInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: SignInEndpointCommandMetadata;
  modalEndpoint?: FluffyModalEndpoint;
};

type FluffyModalEndpoint = {
  modal?: TentacledModal;
};

type TentacledModal = {
  modalWithTitleAndButtonRenderer?: TentacledModalWithTitleAndButtonRenderer;
};

type TentacledModalWithTitleAndButtonRenderer = {
  title?: PauseText;
  content?: PauseText;
  button?: FluffyButton;
};

type FluffyButton = {
  buttonRenderer?: FluffyButtonRenderer;
};

type FluffyButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: PauseText;
  navigationEndpoint?: TentacledNavigationEndpoint;
  trackingParams?: string;
};

type TentacledNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signInEndpoint?: TentacledSignInEndpoint;
};

type TentacledSignInEndpoint = {
  nextEndpoint?: StickyNextEndpoint;
  idamTag?: string;
};

type StickyNextEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  likeEndpoint?: TentacledLikeEndpoint;
};

type TentacledLikeEndpoint = {
  status?: string;
  target?: TargetClass;
  likeParams?: string;
};

type VisibleOnLoad = {
  key?: string;
};

type ViewCount = {
  videoViewCountRenderer?: VideoViewCountRenderer;
};

type VideoViewCountRenderer = {
  viewCount?: PauseText;
  shortViewCount?: PauseText;
  originalViewCount?: string;
};

type VideoSecondaryInfoRenderer = {
  owner?: Owner;
  subscribeButton?: SubscribeButton;
  metadataRowContainer?: MetadataRowContainer;
  showMoreText?: PauseText;
  showLessText?: PauseText;
  trackingParams?: string;
  defaultExpanded?: boolean;
  descriptionCollapsedLines?: number;
  showMoreCommand?: ShowMoreCommand;
  showLessCommand?: ShowLessCommand;
  attributedDescription?: AttributedDescription;
  headerRuns?: HeaderRun[];
};

type AttributedDescription = {
  content?: string;
  commandRuns?: CommandRun[];
  styleRuns?: AttributedDescriptionStyleRun[];
};

type CommandRun = {
  startIndex?: number;
  length?: number;
  onTap?: CommandRunOnTap;
  onTapOptions?: OnTapOptions;
  loggingDirectives?: CommandRunLoggingDirectives;
};

type CommandRunLoggingDirectives = {
  trackingParams?: string;
};

type CommandRunOnTap = {
  innertubeCommand?: StickyInnertubeCommand;
};

type StickyInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  urlEndpoint?: InnertubeCommandURLEndpoint;
  watchEndpoint?: OnTapWatchEndpoint;
  browseEndpoint?: CommandBrowseEndpoint;
};

type InnertubeCommandURLEndpoint = {
  url?: string;
  target?: TargetEnum;
  nofollow?: boolean;
};

type TargetEnum = "TARGET_NEW_WINDOW";

type OnTapWatchEndpoint = {
  videoId?: VideoID;
  continuePlayback?: boolean;
  startTimeSeconds?: number;
  watchEndpointSupportedOnesieConfig?: WatchEndpointSupportedOnesieConfig;
};

type OnTapOptions = {
  accessibilityInfo?: AccessibilityInfo;
};

type AccessibilityInfo = {
  accessibilityLabel?: string;
};

type AttributedDescriptionStyleRun = {
  startIndex?: number;
  length?: number;
  styleRunExtensions?: StyleRunExtensions;
  fontFamilyName?: FontFamilyName;
};

type FontFamilyName = "Roboto";

type StyleRunExtensions = {
  styleRunColorMapExtension?: StyleRunColorMapExtension;
};

type StyleRunColorMapExtension = {
  colorMap?: SampledColor[];
};

type SampledColor = {
  key?: string;
  value?: number;
};

type HeaderRun = {
  startIndex?: number;
  length?: number;
  headerMapping?: HeaderMapping;
};

type HeaderMapping = "ATTRIBUTED_STRING_HEADER_MAPPING_UNSPECIFIED";

type MetadataRowContainer = {
  metadataRowContainerRenderer?: MetadataRowContainerRenderer;
};

type MetadataRowContainerRenderer = {
  collapsedItemCount?: number;
  trackingParams?: string;
};

type Owner = {
  videoOwnerRenderer?: VideoOwnerRenderer;
};

type VideoOwnerRenderer = {
  thumbnail?: VideoOwnerRendererThumbnail;
  title?: Byline;
  subscriptionButton?: SubscriptionButtonClass;
  navigationEndpoint?: ChannelNavigationEndpointClass;
  subscriberCountText?: ShortViewCountText;
  trackingParams?: string;
};

type ChannelNavigationEndpointClass = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  browseEndpoint?: ChannelNavigationEndpointBrowseEndpoint;
};

type ChannelNavigationEndpointBrowseEndpoint = {
  browseId?: string;
  canonicalBaseUrl?: string;
};

type SubscriptionButtonClass = {
  type?: string;
};

type VideoOwnerRendererThumbnail = {
  thumbnails?: ThumbnailElement[];
};

type Byline = {
  runs?: BylineRun[];
};

type BylineRun = {
  text?: string;
  navigationEndpoint?: ChannelNavigationEndpointClass;
};

type ShowLessCommand = {
  clickTrackingParams?: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
};

type ChangeEngagementPanelVisibilityAction = {
  targetId?: string;
  visibility?: string;
};

type ShowMoreCommand = {
  clickTrackingParams?: string;
  commandExecutorCommand?: ShowMoreCommandCommandExecutorCommand;
};

type ShowMoreCommandCommandExecutorCommand = {
  commands?: HilariousCommand[];
};

type HilariousCommand = {
  clickTrackingParams?: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  scrollToEngagementPanelCommand?: Command;
};

type Command = {
  targetId?: string;
};

type SubscribeButton = {
  subscribeButtonRenderer?: SubscribeButtonRenderer;
};

type SubscribeButtonRenderer = {
  buttonText?: SubtitleElement;
  subscribed?: boolean;
  enabled?: boolean;
  type?: string;
  channelId?: ID;
  showPreferences?: boolean;
  subscribedButtonText?: SubtitleElement;
  unsubscribedButtonText?: SubtitleElement;
  trackingParams?: string;
  unsubscribeButtonText?: SubtitleElement;
  subscribeAccessibility?: DisabledAccessibilityData;
  unsubscribeAccessibility?: DisabledAccessibilityData;
  notificationPreferenceButton?: NotificationPreferenceButton;
  targetId?: string;
  signInEndpoint?: SubscribeButtonRendererSignInEndpoint;
  subscribedEntityKey?: string;
  onSubscribeEndpoints?: OnSubscribeEndpoint[];
  onUnsubscribeEndpoints?: OnUnsubscribeEndpoint[];
};

type NotificationPreferenceButton = {
  subscriptionNotificationToggleButtonRenderer?: SubscriptionNotificationToggleButtonRenderer;
};

type SubscriptionNotificationToggleButtonRenderer = {
  states?: StateElement[];
  currentStateId?: number;
  trackingParams?: string;
  command?: SubscriptionNotificationToggleButtonRendererCommand;
  targetId?: string;
  secondaryIcon?: IconImageClass;
};

type SubscriptionNotificationToggleButtonRendererCommand = {
  clickTrackingParams?: string;
  commandExecutorCommand?: PurpleCommandExecutorCommand;
};

type PurpleCommandExecutorCommand = {
  commands?: AmbitiousCommand[];
};

type AmbitiousCommand = {
  clickTrackingParams?: string;
  openPopupAction?: FluffyOpenPopupAction;
};

type FluffyOpenPopupAction = {
  popup?: FluffyPopup;
  popupType?: string;
};

type FluffyPopup = {
  menuPopupRenderer?: PurpleMenuPopupRenderer;
};

type PurpleMenuPopupRenderer = {
  items?: FluffyItem[];
};

type FluffyItem = {
  menuServiceItemRenderer?: FluffyMenuServiceItemRenderer;
};

type FluffyMenuServiceItemRenderer = {
  text?: TextClass;
  icon?: IconImageClass;
  serviceEndpoint?: FluffyServiceEndpoint;
  trackingParams?: string;
  isSelected?: boolean;
};

type FluffyServiceEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  modifyChannelNotificationPreferenceEndpoint?: GetTranscriptEndpoint;
  signalServiceEndpoint?: OnUnsubscribeEndpointSignalServiceEndpoint;
};

type OnUnsubscribeEndpointSignalServiceEndpoint = {
  signal?: Signal;
  actions?: OnUnsubscribeEndpointSignalServiceEndpointPurpleAction[];
};

type OnUnsubscribeEndpointSignalServiceEndpointPurpleAction = {
  clickTrackingParams?: string;
  openPopupAction?: TentacledOpenPopupAction;
};

type TentacledOpenPopupAction = {
  popup?: TentacledPopup;
  popupType?: PopupType;
};

type TentacledPopup = {
  confirmDialogRenderer?: PopupConfirmDialogRenderer;
};

type PopupConfirmDialogRenderer = {
  trackingParams?: string;
  dialogMessages?: SubtitleElement[];
  confirmButton?: A11YSkipNavigationButtonClass;
  cancelButton?: A11YSkipNavigationButtonClass;
  primaryIsCancel?: boolean;
};

type A11YSkipNavigationButtonClass = {
  buttonRenderer?: A11YSkipNavigationButtonButtonRenderer;
};

type A11YSkipNavigationButtonButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: SubtitleElement;
  accessibility?: Accessibility;
  trackingParams?: string;
  serviceEndpoint?: ButtonRendererServiceEndpoint;
  command?: CunningCommand;
  accessibilityData?: DisabledAccessibilityData;
  icon?: IconImageClass;
};

type CunningCommand = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  continuationCommand?: ContinuationEndpointContinuationCommand;
  commandExecutorCommand?: FluffyCommandExecutorCommand;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
};

type FluffyCommandExecutorCommand = {
  commands?: MagentaCommand[];
};

type MagentaCommand = {
  clickTrackingParams?: string;
  updateEngagementPanelContentCommand?: PurpleUpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  entityUpdateCommand?: PurpleEntityUpdateCommand;
  scrollToEngagementPanelCommand?: CommandScrollToEngagementPanelCommand;
};

type PurpleEntityUpdateCommand = {
  entityBatchUpdate?: PurpleEntityBatchUpdate;
};

type PurpleEntityBatchUpdate = {
  mutations?: PurpleMutation[];
};

type PurpleMutation = {
  entityKey?: string;
  type?: string;
  payload?: PurplePayload;
};

type PurplePayload = {
  chipBarStateEntity?: ChipBarStateEntity;
};

type ChipBarStateEntity = {
  key?: string;
  selectedIndex?: number;
};

type CommandScrollToEngagementPanelCommand = {
  panelIdentifier?: PanelIdentifierClass;
};

type PurpleUpdateEngagementPanelContentCommand = {
  targetPanelIdentifier?: ContentSourcePanelIdentifierClass;
  contentSourcePanelIdentifier?: ContentSourcePanelIdentifierClass;
  globalConfiguration?: GetTranscriptEndpoint;
};

type ContentSourcePanelIdentifierClass = {
  surface?: Surface;
  tag?: string;
};

type Surface = "ENGAGEMENT_PANEL_SURFACE_WATCH";

type UpdateTimedMarkersSyncObserverCommand = {
  isEnabled?: boolean;
  timedSyncEntityKey?: TimedSyncEntityKey;
  panelSyncEntityKey?: PanelSyncEntityKey;
};

type PanelSyncEntityKey =
  | "Eh10aW1lbGluZV92aWV3X3N5bmNfZW50aXR5X2tleSDEASgB"
  | "EiZtb2Rlcm5fdHJhbnNjcmlwdF92aWV3X3N5bmNfZW50aXR5X2tleSDEASgB";

type TimedSyncEntityKey =
  | "Eh10aW1lbGluZV92aWV3X3N5bmNfZW50aXR5X2tleSD-ASgB"
  | "EiZtb2Rlcm5fdHJhbnNjcmlwdF92aWV3X3N5bmNfZW50aXR5X2tleSD-ASgB";

type CommandSignalServiceEndpoint = {
  signal?: Signal;
  actions?: CommandSignalServiceEndpointFluffyAction[];
};

type CommandSignalServiceEndpointFluffyAction = {
  clickTrackingParams?: string;
  signalAction?: SignalAction;
};

type SignalAction = {
  signal?: string;
};

type Signal = "CLIENT_SIGNAL";

type ButtonRendererServiceEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  unsubscribeEndpoint?: SubscribeEndpoint;
};

type TextClass = {
  simpleText?: string;
  runs?: SubtitleRun[];
};

type StateElement = {
  stateId?: number;
  nextStateId?: number;
  state?: CancelButton;
};

type CancelButton = {
  buttonRenderer?: NextButtonButtonRenderer;
};

type NextButtonButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  icon?: IconImageClass;
  accessibility?: Accessibility;
  trackingParams?: string;
  accessibilityData?: DisabledAccessibilityData;
  command?: FriskyCommand;
  text?: PauseText;
  navigationEndpoint?: CurrentVideoEndpoint;
};

type FriskyCommand = {
  clickTrackingParams?: string;
  hideEngagementPanelEndpoint?: InnertubeCommandHideEngagementPanelEndpoint;
  commandExecutorCommand?: TentacledCommandExecutorCommand;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  getSurveyCommand?: GetSurveyCommand;
};

type TentacledCommandExecutorCommand = {
  commands?: MischievousCommand[];
};

type MischievousCommand = {
  clickTrackingParams?: string;
  hideEngagementPanelEndpoint?: OnTapShowEngagementPanelEndpoint;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
};

type OnTapShowEngagementPanelEndpoint = {
  identifier?: PanelIdentifierClass;
};

type UpdateToggleButtonStateCommand = {
  toggled?: boolean;
  buttonId?: string;
};

type GetSurveyCommand = {
  endpoint?: GetSurveyCommandEndpoint;
  action?: string;
};

type GetSurveyCommandEndpoint = {
  watch?: AdsEngagementPanelContentRenderer;
};

type AdsEngagementPanelContentRenderer = {
  hack?: boolean;
};

type InnertubeCommandHideEngagementPanelEndpoint = {
  panelIdentifier?: string;
};

type CurrentVideoEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  watchEndpoint?: NextEndpointWatchEndpoint;
};

type OnSubscribeEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  subscribeEndpoint?: SubscribeEndpoint;
};

type OnUnsubscribeEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint?: OnUnsubscribeEndpointSignalServiceEndpoint;
};

type OnUnsubscribeEndpointCommandMetadata = {
  webCommandMetadata?: IndigoWebCommandMetadata;
};

type IndigoWebCommandMetadata = {
  sendPost?: boolean;
};

type SubscribeButtonRendererSignInEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: SignInEndpointCommandMetadata;
  modalEndpoint?: SignInEndpointModalEndpoint;
};

type SignInEndpointModalEndpoint = {
  modal?: StickyModal;
};

type StickyModal = {
  modalWithTitleAndButtonRenderer?: StickyModalWithTitleAndButtonRenderer;
};

type StickyModalWithTitleAndButtonRenderer = {
  title?: PauseText;
  content?: PauseText;
  button?: TentacledButton;
};

type TentacledButton = {
  buttonRenderer?: TentacledButtonRenderer;
};

type TentacledButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: PauseText;
  navigationEndpoint?: StickyNavigationEndpoint;
  trackingParams?: string;
};

type StickyNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signInEndpoint?: StickySignInEndpoint;
};

type StickySignInEndpoint = {
  nextEndpoint?: CurrentVideoEndpoint;
  continueAction?: string;
  idamTag?: string;
};

type TwoColumnWatchNextResultsSecondaryResults = {
  secondaryResults?: SecondaryResultsSecondaryResults;
};

type SecondaryResultsSecondaryResults = {
  results?: SecondaryResultsResult[];
  trackingParams?: string;
};

type SecondaryResultsResult = {
  itemSectionRenderer?: ResultItemSectionRenderer;
};

type ResultItemSectionRenderer = {
  contents?: FluffyContent[];
  trackingParams?: string;
  sectionIdentifier?: string;
  targetId?: string;
};

type FluffyContent = {
  lockupViewModel?: LockupViewModel;
  continuationItemRenderer?: FluffyContinuationItemRenderer;
};

type FluffyContinuationItemRenderer = {
  trigger?: string;
  continuationEndpoint?: PurpleContinuationEndpoint;
  button?: A11YSkipNavigationButtonClass;
};

type LockupViewModel = {
  contentImage?: ContentImage;
  metadata?: LockupViewModelMetadata;
  contentId?: string;
  contentType?: ContentType;
  rendererContext?: LockupViewModelRendererContext;
};

type ContentImage = {
  thumbnailViewModel?: ThumbnailViewModel;
};

type ThumbnailViewModel = {
  image?: ThumbnailViewModelImage;
  overlays?: Overlay[];
};

type ThumbnailViewModelImage = {
  sources?: ThumbnailElement[];
};

type Overlay = {
  thumbnailBottomOverlayViewModel?: ThumbnailBottomOverlayViewModel;
};

type ThumbnailBottomOverlayViewModel = {
  badges?: Badge[];
};

type Badge = {
  thumbnailBadgeViewModel?: ThumbnailBadgeViewModel;
};

type ThumbnailBadgeViewModel = {
  text?: string;
  badgeStyle?: BadgeStyle;
  animationActivationTargetId?: string;
  animationActivationEntityKey?: EntityKey;
  lottieData?: LottieData;
  animatedText?: AnimatedText;
  animationActivationEntitySelectorType?: AnimationActivationEntitySelectorType;
  rendererContext?: ThumbnailBadgeViewModelRendererContext;
  icon?: TrailingImageClass;
  inlinePlaybackBadgeData?: InlinePlaybackBadgeData;
};

type AnimatedText = "En cours de lecture";

type EntityKey = "Eh8veW91dHViZS9hcHAvd2F0Y2gvcGxheWVyX3N0YXRlIMMCKAE%3D";

type AnimationActivationEntitySelectorType =
  "THUMBNAIL_BADGE_ANIMATION_ENTITY_SELECTOR_TYPE_PLAYER_STATE";

type BadgeStyle = "THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT";

type TrailingImageClass = {
  sources?: Source[];
};

type Source = {
  clientResource?: ClientResource;
};

type ClientResource = {
  imageName?: Name;
};

type InlinePlaybackBadgeData = {
  replicateAsTimestamp?: boolean;
};

type LottieData = {
  url?: string;
  settings?: Settings;
};

type Settings = {
  loop?: boolean;
  autoplay?: boolean;
};

type ThumbnailBadgeViewModelRendererContext = {
  accessibilityContext?: Accessibility;
};

type ContentType = "LOCKUP_CONTENT_TYPE_VIDEO";

type LockupViewModelMetadata = {
  lockupMetadataViewModel?: LockupMetadataViewModel;
};

type LockupMetadataViewModel = {
  title?: BodyText;
  image?: LockupMetadataViewModelImage;
  metadata?: LockupMetadataViewModelMetadata;
  menuButton?: MenuButton;
};

type LockupMetadataViewModelImage = {
  decoratedAvatarViewModel?: DecoratedAvatarViewModel;
  avatarStackViewModel?: AvatarStackViewModel;
};

type AvatarStackViewModel = {
  avatars?: AvatarElement[];
  avatarClusterSize?: string;
  layoutType?: string;
  rendererContext?: AvatarStackViewModelRendererContext;
};

type AvatarElement = {
  avatarViewModel?: PurpleAvatarViewModel;
};

type PurpleAvatarViewModel = {
  image?: ThumbnailViewModelImage;
};

type AvatarStackViewModelRendererContext = {
  loggingContext?: RendererContextLoggingContext;
  accessibilityContext?: Accessibility;
  commandContext?: PurpleCommandContext;
};

type PurpleCommandContext = {
  onTap?: IndecentOnTap;
};

type IndecentOnTap = {
  innertubeCommand?: IndigoInnertubeCommand;
};

type IndigoInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: ShowPlaybackRateUpsellPanelCommandCommandMetadata;
  showDialogCommand?: InnertubeCommandShowDialogCommand;
};

type ShowPlaybackRateUpsellPanelCommandCommandMetadata = {
  interactionLoggingCommandMetadata?: InteractionLoggingCommandMetadata;
};

type InteractionLoggingCommandMetadata = {
  screenVisualElement?: ScreenVisualElement;
};

type ScreenVisualElement = {
  uiType?: number;
};

type InnertubeCommandShowDialogCommand = {
  panelLoadingStrategy?: FluffyPanelLoadingStrategy;
};

type FluffyPanelLoadingStrategy = {
  inlineContent?: PurpleInlineContent;
  screenVe?: number;
};

type PurpleInlineContent = {
  dialogViewModel?: PurpleDialogViewModel;
};

type PurpleDialogViewModel = {
  header?: DialogViewModelHeader;
  customContent?: CustomContent;
};

type CustomContent = {
  listViewModel?: CustomContentListViewModel;
};

type CustomContentListViewModel = {
  listItems?: PurpleListItem[];
};

type PurpleListItem = {
  listItemViewModel?: PurpleListItemViewModel;
};

type PurpleListItemViewModel = {
  title?: ListItemViewModelTitle;
  subtitle?: BodyText;
  trailingImage?: TrailingImageClass;
  leadingAccessory?: LeadingAccessory;
  rendererContext?: PurpleRendererContext;
};

type LeadingAccessory = {
  avatarViewModel?: LeadingAccessoryAvatarViewModel;
};

type LeadingAccessoryAvatarViewModel = {
  image?: PurpleImage;
  accessibilityText?: string;
  avatarImageSize?: AvatarImageSize;
};

type AvatarImageSize = "AVATAR_SIZE_M";

type PurpleImage = {
  sources?: CommonConfig[];
  processor?: Processor;
};

type Processor = {
  borderImageProcessor?: BorderImageProcessor;
};

type BorderImageProcessor = {
  circular?: boolean;
};

type PurpleRendererContext = {
  accessibilityContext?: Accessibility;
  commandContext?: FluffyCommandContext;
};

type FluffyCommandContext = {
  onTap?: HilariousOnTap;
};

type HilariousOnTap = {
  innertubeCommand?: InnertubeCommandClass;
};

type InnertubeCommandClass = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  browseEndpoint?: EndpointBrowseEndpoint;
};

type EndpointBrowseEndpoint = {
  browseId?: string;
};

type BodyText = {
  content?: string;
};

type ListItemViewModelTitle = {
  content?: string;
  styleRuns?: TitleStyleRun[];
};

type TitleStyleRun = {
  fontColor?: number;
  weightLabel?: string;
};

type DialogViewModelHeader = {
  dialogHeaderViewModel?: DialogHeaderViewModel;
};

type DialogHeaderViewModel = {
  headline?: BodyText;
};

type RendererContextLoggingContext = {
  loggingDirectives?: RunLoggingDirectives;
};

type DecoratedAvatarViewModel = {
  avatar?: DecoratedAvatarViewModelAvatar;
  a11yLabel?: string;
  rendererContext?: DecoratedAvatarViewModelRendererContext;
};

type DecoratedAvatarViewModelAvatar = {
  avatarViewModel?: FluffyAvatarViewModel;
};

type FluffyAvatarViewModel = {
  image?: ThumbnailViewModelImage;
  avatarImageSize?: AvatarImageSize;
};

type DecoratedAvatarViewModelRendererContext = {
  commandContext?: TentacledCommandContext;
};

type TentacledCommandContext = {
  onTap?: AmbitiousOnTap;
};

type AmbitiousOnTap = {
  innertubeCommand?: ChannelNavigationEndpointClass;
};

type MenuButton = {
  buttonViewModel?: MenuButtonButtonViewModel;
};

type MenuButtonButtonViewModel = {
  iconName?: IconName;
  onTap?: CunningOnTap;
  accessibilityText?: Tooltip;
  style?: ButtonViewModelStyle;
  trackingParams?: string;
  type?: Type;
  buttonSize?: ButtonSize;
  state?: StateEnum;
};

type Tooltip = "Autres actions";

type IconName = "MORE_VERT";

type CunningOnTap = {
  innertubeCommand?: IndecentInnertubeCommand;
};

type IndecentInnertubeCommand = {
  clickTrackingParams?: string;
  showSheetCommand?: InnertubeCommandShowSheetCommand;
};

type InnertubeCommandShowSheetCommand = {
  panelLoadingStrategy?: TentacledPanelLoadingStrategy;
};

type TentacledPanelLoadingStrategy = {
  inlineContent?: FluffyInlineContent;
};

type FluffyInlineContent = {
  sheetViewModel?: SheetViewModel;
};

type SheetViewModel = {
  content?: SheetViewModelContent;
};

type SheetViewModelContent = {
  listViewModel?: ContentListViewModel;
};

type ContentListViewModel = {
  listItems?: FluffyListItem[];
};

type FluffyListItem = {
  listItemViewModel?: FluffyListItemViewModel;
};

type FluffyListItemViewModel = {
  title?: BodyText;
  leadingImage?: TrailingImageClass;
  rendererContext?: FluffyRendererContext;
};

type FluffyRendererContext = {
  loggingContext?: RendererContextLoggingContext;
  commandContext?: StickyCommandContext;
};

type StickyCommandContext = {
  onTap?: MagentaOnTap;
};

type MagentaOnTap = {
  innertubeCommand?: HilariousInnertubeCommand;
};

type HilariousInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signalServiceEndpoint?: InnertubeCommandSignalServiceEndpoint;
  signInEndpoint?: InnertubeCommandSignInEndpoint;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
};

type InnertubeCommandSignalServiceEndpoint = {
  signal?: Signal;
  actions?: TentacledAction[];
};

type TentacledAction = {
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
  params?: Params;
};

type Params = "CAQ%3D";

type VideoCommand = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  watchEndpoint?: VideoCommandWatchEndpoint;
};

type VideoCommandWatchEndpoint = {
  videoId?: string;
  watchEndpointSupportedOnesieConfig?: WatchEndpointSupportedOnesieConfig;
  playerParams?: string;
};

type Type = "BUTTON_VIEW_MODEL_TYPE_TEXT";

type LockupMetadataViewModelMetadata = {
  contentMetadataViewModel?: ContentMetadataViewModel;
};

type ContentMetadataViewModel = {
  metadataRows?: MetadataRow[];
  delimiter?: Delimiter;
};

type Delimiter = " • ";

type MetadataRow = {
  metadataParts?: MetadataPart[];
};

type MetadataPart = {
  text?: Text;
  accessibilityLabel?: string;
};

type Text = {
  content?: string;
  styleRuns?: TextStyleRun[];
};

type TextStyleRun = {
  startIndex?: number;
  length?: number;
};

type LockupViewModelRendererContext = {
  loggingContext?: RendererContextLoggingContext;
  accessibilityContext?: Accessibility;
  commandContext?: IndigoCommandContext;
};

type IndigoCommandContext = {
  onTap?: FriskyOnTap;
};

type FriskyOnTap = {
  innertubeCommand?: EndScreenVideoRendererNavigationEndpoint;
};

type EndScreenVideoRendererNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  watchEndpoint?: PurpleWatchEndpoint;
};

type PurpleWatchEndpoint = {
  videoId?: string;
  nofollow?: boolean;
  watchEndpointSupportedOnesieConfig?: WatchEndpointSupportedOnesieConfig;
  playerParams?: string;
  playlistId?: string;
  params?: string;
  loggingContext?: WatchEndpointLoggingContext;
};

type WatchEndpointLoggingContext = {
  vssLoggingContext?: VssLoggingContext;
};

type VssLoggingContext = {
  serializedContextData?: string;
};

type EngagementPanel = {
  engagementPanelSectionListRenderer?: EngagementPanelSectionListRenderer;
};

type EngagementPanelSectionListRenderer = {
  panelIdentifier?: string;
  header?: EngagementPanelSectionListRendererHeader;
  content?: EngagementPanelSectionListRendererContent;
  veType?: number;
  targetId?: string;
  visibility?: string;
  loggingDirectives?: RunLoggingDirectives;
  onShowCommands?: OnShowCommand[];
  resizability?: string;
  onCloseCommand?: OnCloseCommand;
  identifier?: ContentSourcePanelIdentifierClass;
};

type EngagementPanelSectionListRendererContent = {
  sectionListRenderer?: SectionListRenderer;
  adsEngagementPanelContentRenderer?: AdsEngagementPanelContentRenderer;
  macroMarkersListRenderer?: MacroMarkersListRenderer;
  structuredDescriptionContentRenderer?: StructuredDescriptionContentRenderer;
  continuationItemRenderer?: TentacledContinuationItemRenderer;
};

type TentacledContinuationItemRenderer = {
  trigger?: string;
  continuationEndpoint?: FluffyContinuationEndpoint;
};

type FluffyContinuationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  getTranscriptEndpoint?: GetTranscriptEndpoint;
};

type MacroMarkersListRenderer = {
  contents?: MacroMarkersListRendererContent[];
  syncButtonLabel?: SubtitleElement;
  trackingParams?: string;
  syncModelEntityKey?: string;
};

type MacroMarkersListRendererContent = {
  macroMarkersListItemRenderer?: ContentMacroMarkersListItemRenderer;
};

type ContentMacroMarkersListItemRenderer = {
  title?: PauseText;
  timeDescription?: ShortViewCountText;
  thumbnail?: VideoOwnerRendererThumbnail;
  onTap?: MacroMarkersListItemRendererOnTap;
  trackingParams?: string;
  shareButton?: ShareButton;
  repeatButton?: RepeatButton;
  macroMarkerRepeatStateEntityKey?: string;
  endRepeatCommand?: EndRepeatCommand;
  playerStateEntityKey?: EntityKey;
  carouselType?: string;
  timeDescriptionA11yLabel?: string;
};

type EndRepeatCommand = {
  clickTrackingParams?: string;
  commandExecutorCommand?: EndRepeatCommandCommandExecutorCommand;
};

type EndRepeatCommandCommandExecutorCommand = {
  commands?: BraggadociousCommand[];
};

type BraggadociousCommand = {
  clickTrackingParams?: string;
  entityUpdateCommand?: FluffyEntityUpdateCommand;
  repeatChapterCommand?: CommandRepeatChapterCommand;
};

type FluffyEntityUpdateCommand = {
  entityBatchUpdate?: FluffyEntityBatchUpdate;
};

type FluffyEntityBatchUpdate = {
  mutations?: FluffyMutation[];
};

type FluffyMutation = {
  entityKey?: string;
  type?: string;
};

type CommandRepeatChapterCommand = {
  repeat?: string;
};

type MacroMarkersListItemRendererOnTap = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  watchEndpoint?: OnTapWatchEndpoint;
};

type RepeatButton = {
  toggleButtonRenderer?: ToggleButtonRenderer;
};

type ToggleButtonRenderer = {
  style?: ToggledStyleClass;
  isToggled?: boolean;
  isDisabled?: boolean;
  defaultIcon?: IconImageClass;
  defaultServiceEndpoint?: DefaultServiceEndpoint;
  toggledServiceEndpoint?: EndRepeatCommand;
  trackingParams?: string;
  toggledStyle?: ToggledStyleClass;
  accessibilityData?: DisabledAccessibilityData;
  toggledAccessibilityData?: DisabledAccessibilityData;
};

type DefaultServiceEndpoint = {
  clickTrackingParams?: string;
  repeatChapterCommand?: DefaultServiceEndpointRepeatChapterCommand;
};

type DefaultServiceEndpointRepeatChapterCommand = {
  repeat?: string;
  startTimeMs?: string;
  endTimeMs?: string;
  repeatStateEntityKey?: string;
};

type ToggledStyleClass = {
  styleType?: string;
};

type ShareButton = {
  buttonRenderer?: StickyButtonRenderer;
};

type StickyButtonRenderer = {
  style?: string;
  icon?: IconImageClass;
  trackingParams?: string;
  accessibilityData?: DisabledAccessibilityData;
  command?: CommandClass;
};

type SectionListRenderer = {
  contents?: SectionListRendererContent[];
  trackingParams?: string;
  hack?: boolean;
};

type SectionListRendererContent = {
  itemSectionRenderer?: ContentItemSectionRenderer;
};

type StructuredDescriptionContentRenderer = {
  items?: StructuredDescriptionContentRendererItem[];
};

export type StructuredDescriptionContentRendererItem = {
  videoDescriptionHeaderRenderer?: VideoDescriptionHeaderRenderer;
  expandableVideoDescriptionBodyRenderer?: ExpandableVideoDescriptionBodyRenderer;
  expandableMetadataRenderer?: ExpandableMetadataRenderer;
  horizontalCardListRenderer?: HorizontalCardListRenderer;
  videoDescriptionTranscriptSectionRenderer?: VideoDescriptionTranscriptSectionRenderer;
  videoDescriptionInfocardsSectionRenderer?: VideoDescriptionInfocardsSectionRenderer;
};

type ExpandableMetadataRenderer = {
  header?: ExpandableMetadataRendererHeader;
  expandedContent?: ExpandedContent;
  expandButton?: CancelButton;
  collapseButton?: CancelButton;
  trackingParams?: string;
  colorData?: ColorData;
  useCustomColors?: boolean;
  expandedMenuFooter?: ExpandedMenuFooter;
  loggingDirectives?: RunLoggingDirectives;
};

type ColorData = {
  lightColorPalette?: VibrantColorPaletteClass;
  darkColorPalette?: VibrantColorPaletteClass;
  vibrantColorPalette?: VibrantColorPaletteClass;
  saturatedColorPalettes?: SaturatedColorPalettes;
};

type VibrantColorPaletteClass = {
  section1Color?: number;
  section2Color?: number;
  section3Color?: number;
  primaryTitleColor?: number;
  secondaryTitleColor?: number;
  iconActivatedColor?: number;
  iconInactiveColor?: number;
  section4Color?: number;
  iconDisabledColor?: number;
};

type SaturatedColorPalettes = {
  lightThemePalette?: { [key: string]: number };
  darkThemePalette?: { [key: string]: number };
};

type ExpandedContent = {
  videoSummaryContentViewModel?: VideoSummaryContentViewModel;
};

type VideoSummaryContentViewModel = {
  paragraphs?: Paragraph[];
};

type Paragraph = {
  videoSummaryParagraphViewModel?: VideoSummaryParagraphViewModel;
};

type VideoSummaryParagraphViewModel = {
  text?: BodyText;
};

type ExpandedMenuFooter = {
  menuRenderer?: ExpandedMenuFooterMenuRenderer;
};

type ExpandedMenuFooterMenuRenderer = {
  trackingParams?: string;
  topLevelButtons?: CustomizeButtonElement[];
};

type ExpandableMetadataRendererHeader = {
  collapsedTitle?: PauseText;
  collapsedLabel?: PauseText;
  expandedTitle?: PauseText;
  expandedSubtitle?: PauseText;
  collapsedLabelIcon?: IconImageClass;
  expandedTitleIcon?: IconImageClass;
  expandedSubtitleTapCommand?: ExpandedSubtitleTapCommand;
  expandedSubtitleTrailingIcon?: IconImageClass;
};

type ExpandedSubtitleTapCommand = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  urlEndpoint?: ExpandedSubtitleTapCommandURLEndpoint;
};

type ExpandedSubtitleTapCommandURLEndpoint = {
  url?: string;
  target?: TargetEnum;
};

type ExpandableVideoDescriptionBodyRenderer = {
  showMoreText?: ShortViewCountText;
  showLessText?: PauseText;
  attributedDescriptionBodyText?: AttributedDescription;
  headerRuns?: HeaderRun[];
  backgroundColorStyle?: string;
  lightThemeColorPalette?: Palette;
  darkThemeColorPalette?: Palette;
  colorSampledDescriptionBodyText?: AttributedDescription;
  enableColorSampledDescriptionBodyText?: boolean;
};

type Palette = {
  baseBackground?: number;
  raisedBackground?: number;
  additiveBackground?: number;
  textPrimary?: number;
  textSecondary?: number;
  invertedBackground?: number;
  overlayBackground?: number;
};

type HorizontalCardListRenderer = {
  cards?: HorizontalCardListRendererCard[];
  trackingParams?: string;
  header?: HorizontalCardListRendererHeader;
  style?: SubscriptionButtonClass;
  centerItems?: boolean;
  footerButton?: FooterButton;
};

export type HorizontalCardListRendererCard = {
  macroMarkersListItemRenderer?: CardMacroMarkersListItemRenderer;
  videoAttributeViewModel?: VideoAttributeViewModel;
};

type CardMacroMarkersListItemRenderer = {
  title?: PauseText;
  timeDescription?: PauseText;
  thumbnail?: VideoOwnerRendererThumbnail;
  onTap?: MacroMarkersListItemRendererOnTap;
  trackingParams?: string;
  layout?: string;
  carouselType?: string;
  lightThemeColorSamplingPalette?: Palette;
  darkThemeColorSamplingPalette?: Palette;
};

type VideoAttributeViewModel = {
  image?: VideoAttributeViewModelImage;
  imageStyle?: string;
  title?: string;
  subtitle?: string;
  secondarySubtitle?: BodyText;
  orientation?: string;
  onTap?: VideoAttributeViewModelOnTap;
  sizingRule?: string;
  overflowMenuOnTap?: OverflowMenuOnTap;
  overflowMenuA11yLabel?: Tooltip;
  loggingDirectives?: RunLoggingDirectives;
};

type VideoAttributeViewModelImage = {
  sources?: CommonConfig[];
};

type VideoAttributeViewModelOnTap = {
  innertubeCommand?: CurrentVideoEndpoint;
};

type OverflowMenuOnTap = {
  innertubeCommand?: OverflowMenuOnTapInnertubeCommand;
};

type OverflowMenuOnTapInnertubeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: SignInEndpointCommandMetadata;
  confirmDialogEndpoint?: ConfirmDialogEndpoint;
};

type ConfirmDialogEndpoint = {
  content?: ConfirmDialogEndpointContent;
};

type ConfirmDialogEndpointContent = {
  confirmDialogRenderer?: ContentConfirmDialogRenderer;
};

type ContentConfirmDialogRenderer = {
  title?: SubtitleElement;
  trackingParams?: string;
  dialogMessages?: DialogMessage[];
  confirmButton?: A11YSkipNavigationButtonClass;
  primaryIsCancel?: boolean;
};

type DialogMessage = {
  runs?: PurpleRun[];
};

type PurpleRun = {
  text?: string;
  bold?: boolean;
};

type FooterButton = {
  buttonViewModel?: FooterButtonButtonViewModel;
};

type FooterButtonButtonViewModel = {
  iconName?: FooterButtonButtonViewModelIconName;
  onTap?: HilariousOnTap;
  style?: ButtonViewModelStyle;
  trackingParams?: string;
  type?: string;
  buttonSize?: ButtonSize;
  titleFormatted?: BodyText;
};

type FooterButtonButtonViewModelIconName =
  | "MUSIC"
  | "yt-sys-icons:chevron_right"
  | "ADD_TO_QUEUE_TAIL"
  | "BOOKMARK_BORDER"
  | "SHARE";

type HorizontalCardListRendererHeader = {
  richListHeaderRenderer?: RichListHeaderRenderer;
};

type RichListHeaderRenderer = {
  title?: PauseText;
  trackingParams?: string;
  navigationButton?: NavigationButton;
  subtitle?: PauseText;
};

type NavigationButton = {
  buttonRenderer?: NavigationButtonButtonRenderer;
};

type NavigationButtonButtonRenderer = {
  style?: string;
  text?: PauseText;
  trackingParams?: string;
  command?: Command1;
};

type Command1 = {
  clickTrackingParams?: CommandClickTrackingParams;
  commandExecutorCommand?: StickyCommandExecutorCommand;
};

type CommandClickTrackingParams =
  | "CCYQsNAHIhMI_Jbo_an3lAMVSIQ3CB1AmiJFygEERFAgvQ=="
  | "CF4QkNAGIhMI_Jbo_an3lAMVSIQ3CB1AmiJFygEERFAgvQ==";

type StickyCommandExecutorCommand = {
  commands?: Command2[];
};

type Command2 = {
  clickTrackingParams?: CommandClickTrackingParams;
  updateEngagementPanelContentCommand?: FluffyUpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  entityUpdateCommand?: PurpleEntityUpdateCommand;
  scrollToEngagementPanelCommand?: CommandScrollToEngagementPanelCommand;
};

type FluffyUpdateEngagementPanelContentCommand = {
  targetPanelIdentifier?: ContentSourcePanelIdentifierClass;
  contentSourcePanelIdentifier?: ContentSourcePanelIdentifierClass;
};

type VideoDescriptionHeaderRenderer = {
  title?: SubtitleElement;
  channel?: PauseText;
  views?: PauseText;
  publishDate?: PauseText;
  factoid?: FactoidElement[];
  channelNavigationEndpoint?: ChannelNavigationEndpointClass;
  channelThumbnail?: Channel;
};

type Channel = {
  thumbnails?: CommonConfig[];
};

type FactoidElement = {
  factoidRenderer?: FactoidRenderer;
  viewCountFactoidRenderer?: ViewCountFactoidRenderer;
};

type FactoidRenderer = {
  value?: PauseText;
  label?: PauseText;
  accessibilityText?: string;
  backgroundColorStyle?: string;
  lightThemeColorPalette?: Palette;
  darkThemeColorPalette?: Palette;
  enableColorSampledText?: boolean;
  position?: string;
};

type ViewCountFactoidRenderer = {
  viewCountEntityKey?: string;
  factoid?: ViewCountFactoidRendererFactoid;
  viewCountType?: string;
};

type ViewCountFactoidRendererFactoid = {
  factoidRenderer?: FactoidRenderer;
};

type VideoDescriptionInfocardsSectionRenderer = {
  sectionTitle?: PauseText;
  creatorVideosButton?: LanguagePickerButtonClass;
  creatorAboutButton?: LanguagePickerButtonClass;
  sectionSubtitle?: ShortViewCountText;
  channelAvatar?: Channel;
  channelEndpoint?: ChannelNavigationEndpointClass;
  trackingParams?: string;
};

type LanguagePickerButtonClass = {
  buttonRenderer?: LanguagePickerButtonButtonRenderer;
};

type LanguagePickerButtonButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: PauseText;
  icon?: IconImageClass;
  trackingParams?: string;
  command?: NavigationEndpointClass;
  accessibility?: Accessibility;
  iconPosition?: string;
};

type VideoDescriptionTranscriptSectionRenderer = {
  sectionTitle?: SubtitleElement;
  subHeaderText?: SubtitleElement;
  primaryButton?: A11YSkipNavigationButtonClass;
  trackingParams?: string;
};

type EngagementPanelSectionListRendererHeader = {
  engagementPanelTitleHeaderRenderer?: EngagementPanelTitleHeaderRenderer;
};

type EngagementPanelTitleHeaderRenderer = {
  title?: TextClass;
  contextualInfo?: SubtitleElement;
  menu?: Menu;
  visibilityButton?: CancelButton;
  trackingParams?: string;
  subheader?: Subheader;
  subtitle?: CompositeVideoPrimaryInfoRendererClass;
};

type Menu = {
  sortFilterSubMenuRenderer?: SortFilterSubMenuRenderer;
  menuRenderer?: MenuMenuRenderer;
};

type MenuMenuRenderer = {
  items?: TentacledItem[];
  trackingParams?: string;
  accessibility?: DisabledAccessibilityData;
};

type TentacledItem = {
  menuServiceItemRenderer?: TentacledMenuServiceItemRenderer;
};

type TentacledMenuServiceItemRenderer = {
  text?: SubtitleElement;
  serviceEndpoint?: OnResponseReceivedEndpoint;
  trackingParams?: string;
};

type OnResponseReceivedEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
  loadMarkersCommand?: LoadMarkersCommand;
};

type LoadMarkersCommand = {
  entityKeys?: string[];
};

type SortFilterSubMenuRenderer = {
  subMenuItems?: SubMenuItem[];
  icon?: IconImageClass;
  accessibility?: DisabledAccessibilityData;
  trackingParams?: string;
};

type SubMenuItem = {
  title?: string;
  selected?: boolean;
  serviceEndpoint?: SubMenuItemServiceEndpoint;
  accessibility?: DisabledAccessibilityData;
  subtitle?: string;
  trackingParams?: string;
};

type SubMenuItemServiceEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  continuationCommand?: ServiceEndpointContinuationCommand;
};

type ServiceEndpointContinuationCommand = {
  token?: string;
  request?: string;
  command?: ContinuationCommandCommand;
};

type ContinuationCommandCommand = {
  clickTrackingParams?: string;
  showReloadUiCommand?: Command;
};

type Subheader = {
  chipBarViewModel?: ChipBarViewModel;
};

type ChipBarViewModel = {
  chips?: Chip[];
  chipBarStateEntityKey?: string;
};

type Chip = {
  chipViewModel?: ChipViewModel;
};

type ChipViewModel = {
  text?: string;
  selected?: boolean;
  displayType?: string;
  tapCommand?: TapCommand;
  accessibilityLabel?: string;
  loggingDirectives?: RunLoggingDirectives;
};

type TapCommand = {
  innertubeCommand?: TapCommandInnertubeCommand;
};

type TapCommandInnertubeCommand = {
  clickTrackingParams?: string;
  commandExecutorCommand?: IndigoCommandExecutorCommand;
};

type IndigoCommandExecutorCommand = {
  commands?: Command3[];
};

type Command3 = {
  clickTrackingParams?: string;
  updateEngagementPanelContentCommand?: PurpleUpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
};

type OnCloseCommand = {
  clickTrackingParams?: string;
  commandExecutorCommand?: OnCloseCommandCommandExecutorCommand;
};

type OnCloseCommandCommandExecutorCommand = {
  commands?: Command4[];
};

type Command4 = {
  clickTrackingParams?: string;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
};

type OnShowCommand = {
  clickTrackingParams?: string;
  scrollToEngagementPanelCommand?: OnShowCommandScrollToEngagementPanelCommand;
};

type OnShowCommandScrollToEngagementPanelCommand = {
  panelIdentifier?: PanelIdentifierClass;
  targetId?: string;
};

type FrameworkUpdatesEntityBatchUpdate = {
  mutations?: TentacledMutation[];
  timestamp?: Timestamp;
};

type TentacledMutation = {
  entityKey?: string;
  type?: string;
  options?: Options;
  payload?: FluffyPayload;
};

type Options = {
  persistenceOption?: string;
};

type FluffyPayload = {
  likeStatusEntity?: LikeStatusEntity;
  subscriptionStateEntity?: SubscriptionStateEntity;
};

type SubscriptionStateEntity = {
  key?: string;
  subscribed?: boolean;
};

type Timestamp = {
  seconds?: string;
  nanos?: number;
};

type Microformat = {
  microformatDataRenderer?: MicroformatDataRenderer;
  playerMicroformatRenderer?: PlayerMicroformatRenderer;
};

type MicroformatDataRenderer = {
  videoDetails?: MicroformatDataRendererVideoDetails;
};

type MicroformatDataRendererVideoDetails = {
  comments?: Comment[];
};

type Comment = {
  type?: string;
  dateCreated?: Date;
  text?: string;
  author?: Author;
  upvoteCount?: number;
};

type Author = {
  type?: string;
  name?: string;
  url?: string;
  alternateName?: string;
};

type PageVisualEffect = {
  cinematicContainerRenderer?: CinematicContainerRenderer;
};

type CinematicContainerRenderer = {
  presentationStyle?: string;
  config?: CinematicContainerRendererConfig;
  colorStore?: ColorStore;
};

type ColorStore = {
  sampledColors?: SampledColor[];
};

type CinematicContainerRendererConfig = {
  lightThemeBackgroundColor?: number;
  darkThemeBackgroundColor?: number;
  animationConfig?: AnimationConfig;
  colorSourceSizeMultiplier?: number;
  applyClientImageBlur?: boolean;
  bottomColorSourceHeightMultiplier?: number;
  maxBottomColorSourceHeight?: number;
  colorSourceWidthMultiplier?: number;
  colorSourceHeightMultiplier?: number;
  blurStrength?: number;
  watchFullscreenConfig?: WatchFullscreenConfig;
  enableInLightTheme?: boolean;
};

type AnimationConfig = {
  minImageUpdateIntervalMs?: number;
  crossfadeDurationMs?: number;
  crossfadeStartOffset?: number;
  maxFrameRate?: number;
};

type WatchFullscreenConfig = {
  colorSourceWidthMultiplier?: number;
  colorSourceHeightMultiplier?: number;
  scrimWidthMultiplier?: number;
  scrimHeightMultiplier?: number;
  scrimGradientConfig?: ScrimGradientConfig;
};

type ScrimGradientConfig = {
  gradientType?: string;
  gradientStartPointX?: number;
  gradientStartPointY?: number;
  gradientEndPointX?: number;
  gradientEndPointY?: number;
};

type PlayerOverlays = {
  playerOverlayRenderer?: PlayerOverlayRenderer;
};

type PlayerOverlayRenderer = {
  endScreen?: EndScreen;
  autoplay?: PlayerOverlayRendererAutoplay;
  shareButton?: ShareButtonClass;
  addToMenu?: AddToMenu;
  videoDetails?: PlayerOverlayRendererVideoDetails;
  autonavToggle?: AutonavToggle;
  decoratedPlayerBarRenderer?: PlayerOverlayRendererDecoratedPlayerBarRenderer;
  fullscreenQuickActionsBar?: FullscreenQuickActionsBar;
  speedmasterUserEdu?: SpeedmasterUserEdu;
  showPlaybackRateUpsellPanelCommand?: ShowPlaybackRateUpsellPanelCommand;
};

type AddToMenu = {
  menuRenderer?: AddToMenuMenuRenderer;
};

type AddToMenuMenuRenderer = {
  items?: StickyItem[];
  trackingParams?: string;
};

type StickyItem = {
  menuNavigationItemRenderer?: MenuItemRenderer;
};

type AutonavToggle = {
  autoplaySwitchButtonRenderer?: AutoplaySwitchButtonRenderer;
};

type AutoplaySwitchButtonRenderer = {
  onEnabledCommand?: OnAbledCommand;
  onDisabledCommand?: OnAbledCommand;
  enabledAccessibilityData?: DisabledAccessibilityData;
  disabledAccessibilityData?: DisabledAccessibilityData;
  trackingParams?: string;
  enabled?: boolean;
};

type OnAbledCommand = {
  clickTrackingParams?: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  setSettingEndpoint?: SetSettingEndpoint;
};

type SetSettingEndpoint = {
  settingItemId?: string;
  boolValue?: boolean;
  settingItemIdForClient?: string;
};

type PlayerOverlayRendererAutoplay = {
  playerOverlayAutoplayRenderer?: PlayerOverlayAutoplayRenderer;
};

type PlayerOverlayAutoplayRenderer = {
  title?: PauseText;
  videoTitle?: ShortViewCountText;
  byline?: Byline;
  pauseText?: PauseText;
  background?: Background;
  countDownSecs?: number;
  cancelButton?: CancelButton;
  nextButton?: CancelButton;
  trackingParams?: string;
  closeButton?: A11YSkipNavigationButtonClass;
  thumbnailOverlays?: PlayerOverlayAutoplayRendererThumbnailOverlay[];
  preferImmediateRedirect?: boolean;
  videoId?: string;
  publishedTimeText?: PauseText;
  webShowNewAutonavCountdown?: boolean;
  webShowBigThumbnailEndscreen?: boolean;
  shortViewCountText?: ShortViewCountText;
  countDownSecsForFullscreen?: number;
};

type Background = {
  thumbnails?: ThumbnailElement[];
  lightColorPalette?: BackgroundDarkColorPalette;
  darkColorPalette?: BackgroundDarkColorPalette;
};

type BackgroundDarkColorPalette = {
  section2Color?: number;
  section3Color?: number;
  primaryTitleColor?: number;
  secondaryTitleColor?: number;
  section4Color?: number;
};

type PlayerOverlayAutoplayRendererThumbnailOverlay = {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
};

type ThumbnailOverlayTimeStatusRenderer = {
  text?: ShortViewCountText;
  style?: ThumbnailOverlayTimeStatusRendererStyle;
  icon?: IconImageClass;
};

type ThumbnailOverlayTimeStatusRendererStyle = "DEFAULT";

type PlayerOverlayRendererDecoratedPlayerBarRenderer = {
  decoratedPlayerBarRenderer?: DecoratedPlayerBarRendererDecoratedPlayerBarRenderer;
};

type DecoratedPlayerBarRendererDecoratedPlayerBarRenderer = {
  playerBar?: PlayerBar;
  playerBarActionButton?: PlayerBarActionButton;
  buttonType?: string;
};

type PlayerBar = {
  multiMarkersPlayerBarRenderer?: MultiMarkersPlayerBarRenderer;
};

type MultiMarkersPlayerBarRenderer = {
  visibleOnLoad?: VisibleOnLoad;
  markersMap?: MarkersMap[];
  trackingParams?: string;
};

type MarkersMap = {
  key?: string;
  value?: Value;
};

type Value = {
  chapters?: Chapter[];
  trackingParams?: string;
  onChapterRepeat?: OnChapterRepeat;
};

type Chapter = {
  chapterRenderer?: ChapterRenderer;
};

type ChapterRenderer = {
  title?: PauseText;
  timeRangeStartMillis?: number;
  onActiveCommand?: OnActiveCommand;
  thumbnail?: VideoOwnerRendererThumbnail;
};

type OnActiveCommand = {
  clickTrackingParams?: string;
  setActivePanelItemAction?: SetActivePanelItemAction;
};

type SetActivePanelItemAction = {
  panelTargetId?: string;
  itemIndex?: number;
};

type OnChapterRepeat = {
  clickTrackingParams?: string;
  openPopupAction?: OnChapterRepeatOpenPopupAction;
};

type OnChapterRepeatOpenPopupAction = {
  popup?: StickyPopup;
  popupType?: string;
};

type StickyPopup = {
  notificationActionRenderer?: NotificationActionRenderer;
};

type NotificationActionRenderer = {
  responseText?: SubtitleElement;
  actionButton?: ActionButton;
  trackingParams?: string;
};

type ActionButton = {
  buttonRenderer?: ActionButtonButtonRenderer;
};

type ActionButtonButtonRenderer = {
  style?: string;
  text?: SubtitleElement;
  trackingParams?: string;
  command?: Command5;
};

type Command5 = {
  clickTrackingParams?: string;
  repeatChapterCommand?: CommandRepeatChapterCommand;
};

type PlayerBarActionButton = {
  buttonRenderer?: PlayerBarActionButtonButtonRenderer;
};

type PlayerBarActionButtonButtonRenderer = {
  text?: SubtitleElement;
  trackingParams?: string;
  command?: Command1;
};

type EndScreen = {
  watchNextEndScreenRenderer?: WatchNextEndScreenRenderer;
};

type WatchNextEndScreenRenderer = {
  results?: WatchNextEndScreenRendererResult[];
  title?: PauseText;
  trackingParams?: string;
};

type WatchNextEndScreenRendererResult = {
  endScreenVideoRenderer?: EndScreenVideoRenderer;
};

type EndScreenVideoRenderer = {
  videoId?: string;
  thumbnail?: Background;
  title?: ShortViewCountText;
  shortBylineText?: ShortBylineText;
  lengthText?: ShortViewCountText;
  lengthInSeconds?: number;
  navigationEndpoint?: EndScreenVideoRendererNavigationEndpoint;
  trackingParams?: string;
  shortViewCountText?: ShortViewCountText;
  publishedTimeText?: PauseText;
  thumbnailOverlays?: EndScreenVideoRendererThumbnailOverlay[];
};

type ShortBylineText = {
  runs?: ShortBylineTextRun[];
};

type ShortBylineTextRun = {
  text?: string;
  navigationEndpoint?: IndigoNavigationEndpoint;
};

type IndigoNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: FluffyCommandMetadata;
  browseEndpoint?: ChannelNavigationEndpointBrowseEndpoint;
  showDialogCommand?: InnertubeCommandShowDialogCommand;
};

type FluffyCommandMetadata = {
  webCommandMetadata?: PurpleWebCommandMetadata;
  interactionLoggingCommandMetadata?: InteractionLoggingCommandMetadata;
};

type EndScreenVideoRendererThumbnailOverlay = {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
};

type ThumbnailOverlayNowPlayingRenderer = {
  text?: SubtitleElement;
};

type FullscreenQuickActionsBar = {
  quickActionsViewModel?: QuickActionsViewModel;
};

type QuickActionsViewModel = {
  quickActionButtons?: QuickActionButton[];
};

type QuickActionButton = {
  likeButtonViewModel?: LikeButtonViewModelLikeButtonViewModel;
  dislikeButtonViewModel?: DislikeButtonViewModelDislikeButtonViewModel;
  toggleButtonViewModel?: QuickActionButtonToggleButtonViewModel;
  buttonViewModel?: QuickActionButtonButtonViewModel;
};

type QuickActionButtonButtonViewModel = {
  iconName?: string;
  onTap?: MischievousOnTap;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: Type;
  buttonSize?: string;
  state?: StateEnum;
  accessibilityId?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
  tooltip?: Tooltip;
};

type MischievousOnTap = {
  serialCommand?: FluffySerialCommand;
  innertubeCommand?: AmbitiousInnertubeCommand;
};

type AmbitiousInnertubeCommand = {
  clickTrackingParams?: string;
  openPopupAction?: InnertubeCommandOpenPopupAction;
};

type InnertubeCommandOpenPopupAction = {
  popup?: IndigoPopup;
  popupType?: string;
};

type IndigoPopup = {
  menuPopupRenderer?: FluffyMenuPopupRenderer;
};

type FluffyMenuPopupRenderer = {
  items?: MenuItemElement[];
};

type QuickActionButtonToggleButtonViewModel = {
  defaultButtonViewModel?: TentacledDefaultButtonViewModel;
  toggledButtonViewModel?: FluffyToggledButtonViewModel;
  trackingParams?: string;
  toggledStateEntitySelectorType?: string;
};

type TentacledDefaultButtonViewModel = {
  buttonViewModel?: IndecentButtonViewModel;
};

type IndecentButtonViewModel = {
  iconName?: string;
  onTap?: BraggadociousOnTap;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  type?: Type;
  buttonSize?: string;
  state?: StateEnum;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
};

type BraggadociousOnTap = {
  innertubeCommand?: CunningInnertubeCommand;
};

type CunningInnertubeCommand = {
  clickTrackingParams?: string;
  commandExecutorCommand?: IndecentCommandExecutorCommand;
};

type IndecentCommandExecutorCommand = {
  commands?: Command6[];
};

type Command6 = {
  clickTrackingParams?: string;
  showEngagementPanelEndpoint?: InnertubeCommandHideEngagementPanelEndpoint;
  scrollToEngagementPanelCommand?: Command;
};

type FluffyToggledButtonViewModel = {
  buttonViewModel?: HilariousButtonViewModel;
};

type HilariousButtonViewModel = {
  iconName?: string;
  onTap?: OnTap1;
  accessibilityText?: string;
  style?: string;
  trackingParams?: string;
  type?: Type;
  buttonSize?: string;
  state?: StateEnum;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
};

type OnTap1 = {
  innertubeCommand?: MagentaInnertubeCommand;
};

type MagentaInnertubeCommand = {
  clickTrackingParams?: string;
  hideEngagementPanelEndpoint?: InnertubeCommandHideEngagementPanelEndpoint;
};

type ShareButtonClass = {
  buttonRenderer?: SignInButtonButtonRenderer;
};

type SignInButtonButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  icon?: IconImageClass;
  navigationEndpoint?: CommandClass;
  tooltip?: string;
  trackingParams?: string;
  text?: PauseText;
  command?: Command7;
};

type Command7 = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signInEndpoint?: AdsEngagementPanelContentRenderer;
};

type ShowPlaybackRateUpsellPanelCommand = {
  clickTrackingParams?: string;
  commandMetadata?: ShowPlaybackRateUpsellPanelCommandCommandMetadata;
  showDialogCommand?: ShowPlaybackRateUpsellPanelCommandShowDialogCommand;
};

type ShowPlaybackRateUpsellPanelCommandShowDialogCommand = {
  panelLoadingStrategy?: StickyPanelLoadingStrategy;
};

type StickyPanelLoadingStrategy = {
  requestTemplate?: RequestTemplate;
  screenVe?: number;
};

type SpeedmasterUserEdu = {
  speedmasterEduViewModel?: SpeedmasterEduViewModel;
};

type SpeedmasterEduViewModel = {
  bodyText?: BodyText;
};

type PlayerOverlayRendererVideoDetails = {
  playerOverlayVideoDetailsRenderer?: PlayerOverlayVideoDetailsRenderer;
};

type PlayerOverlayVideoDetailsRenderer = {
  title?: PauseText;
  subtitle?: SubtitleElement;
  channelAvatar?: ChannelAvatar;
  onTap?: PlayerOverlayVideoDetailsRendererOnTap;
};

type ChannelAvatar = {
  avatarViewModel?: ChannelAvatarAvatarViewModel;
};

type ChannelAvatarAvatarViewModel = {
  image?: VideoAttributeViewModelImage;
  avatarImageSize?: string;
};

type PlayerOverlayVideoDetailsRendererOnTap = {
  clickTrackingParams?: string;
  showEngagementPanelEndpoint?: OnTapShowEngagementPanelEndpoint;
};

type WebResponseContextExtensionData = {
  webResponseContextPreloadData?: WebResponseContextPreloadData;
  ytConfigData?: YtConfigData;
  webPrefetchData?: WebPrefetchData;
  hasDecorated?: boolean;
};

type WebPrefetchData = {
  navigationEndpoints?: NavigationEndpointElement[];
};

type YtConfigData = {
  visitorData?: string;
  rootVisualElementType?: number;
};

type Topbar = {
  desktopTopbarRenderer?: DesktopTopbarRenderer;
};

type DesktopTopbarRenderer = {
  logo?: Logo;
  searchbox?: Searchbox;
  trackingParams?: string;
  interstitial?: Interstitial;
  countryCode?: string;
  topbarButtons?: TopbarButton[];
  hotkeyDialog?: HotkeyDialog;
  backButton?: BackButtonClass;
  forwardButton?: BackButtonClass;
  a11ySkipNavigationButton?: A11YSkipNavigationButtonClass;
};

type BackButtonClass = {
  buttonRenderer?: BackButtonButtonRenderer;
};

type BackButtonButtonRenderer = {
  trackingParams?: string;
  command?: OnResponseReceivedEndpoint;
};

type HotkeyDialog = {
  hotkeyDialogRenderer?: HotkeyDialogRenderer;
};

type HotkeyDialogRenderer = {
  title?: SubtitleElement;
  sections?: Section[];
  dismissButton?: A11YSkipNavigationButtonClass;
  trackingParams?: string;
};

type Section = {
  hotkeyDialogSectionRenderer?: HotkeyDialogSectionRenderer;
};

type HotkeyDialogSectionRenderer = {
  title?: SubtitleElement;
  options?: Option[];
};

type Option = {
  hotkeyDialogSectionOptionRenderer?: HotkeyDialogSectionOptionRenderer;
};

type HotkeyDialogSectionOptionRenderer = {
  label?: SubtitleElement;
  hotkey?: string;
  hotkeyAccessibilityLabel?: DisabledAccessibilityData;
};

type Interstitial = {
  consentBumpV2Renderer?: ConsentBumpV2Renderer;
};

type ConsentBumpV2Renderer = {
  interstitialLogoAside?: SubtitleElement;
  languagePickerButton?: LanguagePickerButtonClass;
  interstitialTitle?: SubtitleElement;
  customizeButton?: CustomizeButtonElement;
  agreeButton?: AgreeButton;
  privacyLink?: PrivacyLink;
  termsLink?: PrivacyLink;
  trackingParams?: string;
  signInButton?: ShareButtonClass;
  languageList?: LanguageList;
  readMoreButton?: LanguagePickerButtonClass;
  disableP13nButton?: DisableP13NButton;
  loadingMessage?: SubtitleElement;
  errorMessage?: SubtitleElement;
  eomV1Text?: EOMV1Text;
};

type AgreeButton = {
  buttonRenderer?: AgreeButtonButtonRenderer;
};

type AgreeButtonButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: PauseText;
  accessibility?: Accessibility;
  trackingParams?: string;
  command?: Command8;
};

type Command8 = {
  clickTrackingParams?: string;
  saveConsentAction?: Action;
};

type Action = {
  socsCookie?: string;
  savePreferenceUrl?: string;
};

type DisableP13NButton = {
  buttonRenderer?: DisableP13NButtonButtonRenderer;
};

type DisableP13NButtonButtonRenderer = {
  style?: string;
  size?: Size;
  isDisabled?: boolean;
  text?: PauseText;
  trackingParams?: string;
  accessibilityData?: DisabledAccessibilityData;
  command?: Command9;
};

type Command9 = {
  clickTrackingParams?: string;
  disablePersonalizationAction?: Action;
};

type EOMV1Text = {
  essentialCookieMsg?: EssentialCookieMsg;
  nonEssentialCookieMsg?: NonEssentialCookieMsg;
  ifReject?: SubtitleElement;
  personalization?: SubtitleElement;
  moreOptions?: SubtitleElement;
};

type EssentialCookieMsg = {
  begin?: PrivacyLink;
  items?: SubtitleElement[];
};

type PrivacyLink = {
  runs?: PrivacyLinkRun[];
};

type PrivacyLinkRun = {
  text?: string;
  navigationEndpoint?: IndecentNavigationEndpoint;
};

type IndecentNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  urlEndpoint?: CommonConfig;
};

type NonEssentialCookieMsg = {
  begin?: SubtitleElement;
  items?: SubtitleElement[];
};

type LanguageList = {
  dropdownRenderer?: DropdownRenderer;
};

type DropdownRenderer = {
  entries?: Entry[];
  accessibility?: Accessibility;
};

type Entry = {
  dropdownItemRenderer?: DropdownItemRenderer;
};

type DropdownItemRenderer = {
  label?: PauseText;
  isSelected?: boolean;
  stringValue?: string;
  onSelectCommand?: OnSelectCommand;
};

type OnSelectCommand = {
  clickTrackingParams?: OnSelectCommandClickTrackingParams;
  commandMetadata?: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint?: OnSelectCommandSignalServiceEndpoint;
};

type OnSelectCommandClickTrackingParams =
  "CAoQ3IAHIhMI_Jbo_an3lAMVSIQ3CB1AmiJFygEERFAgvQ==";

type OnSelectCommandSignalServiceEndpoint = {
  signal?: Signal;
  actions?: StickyAction[];
};

type StickyAction = {
  clickTrackingParams?: OnSelectCommandClickTrackingParams;
  selectLanguageCommand?: SelectLanguageCommand;
};

type SelectLanguageCommand = {
  hl?: string;
};

type Logo = {
  topbarLogoRenderer?: TopbarLogoRenderer;
};

type TopbarLogoRenderer = {
  iconImage?: IconImageClass;
  tooltipText?: SubtitleElement;
  endpoint?: InnertubeCommandClass;
  trackingParams?: string;
  overrideEntityKey?: string;
};

type Searchbox = {
  fusionSearchboxRenderer?: FusionSearchboxRenderer;
};

type FusionSearchboxRenderer = {
  icon?: IconImageClass;
  placeholderText?: SubtitleElement;
  config?: FusionSearchboxRendererConfig;
  trackingParams?: string;
  searchEndpoint?: FusionSearchboxRendererSearchEndpoint;
  clearButton?: CancelButton;
  showImageSourceDialog?: ShowImageSourceDialog;
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
  commandMetadata?: AutoplayVideoCommandMetadata;
  searchEndpoint?: SearchEndpointSearchEndpoint;
};

type SearchEndpointSearchEndpoint = {
  query?: string;
};

type ShowImageSourceDialog = {
  clickTrackingParams?: string;
  showDialogCommand?: ShowImageSourceDialogShowDialogCommand;
};

type ShowImageSourceDialogShowDialogCommand = {
  panelLoadingStrategy?: IndigoPanelLoadingStrategy;
};

type IndigoPanelLoadingStrategy = {
  inlineContent?: TentacledInlineContent;
};

type TentacledInlineContent = {
  dialogViewModel?: FluffyDialogViewModel;
};

type FluffyDialogViewModel = {
  header?: DialogViewModelHeader;
  footer?: Footer;
  content?: DialogViewModelContent;
};

type DialogViewModelContent = {
  basicContentViewModel?: BasicContentViewModel;
};

type BasicContentViewModel = {
  paragraphs?: VideoSummaryParagraphViewModel[];
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
  style?: ButtonViewModelStyle;
  trackingParams?: string;
  isFullWidth?: boolean;
  type?: string;
};

type TopbarButton = {
  topbarMenuButtonRenderer?: TopbarMenuButtonRenderer;
  buttonRenderer?: TopbarButtonButtonRenderer;
};

type TopbarButtonButtonRenderer = {
  style?: string;
  size?: string;
  text?: SubtitleElement;
  icon?: IconImageClass;
  navigationEndpoint?: HilariousNavigationEndpoint;
  trackingParams?: string;
  targetId?: string;
};

type HilariousNavigationEndpoint = {
  clickTrackingParams?: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  signInEndpoint?: IndigoSignInEndpoint;
};

type IndigoSignInEndpoint = {
  idamTag?: string;
};

type TopbarMenuButtonRenderer = {
  icon?: IconImageClass;
  menuRequest?: MenuRequest;
  trackingParams?: string;
  accessibility?: DisabledAccessibilityData;
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
  actions?: IndigoAction[];
};

type IndigoAction = {
  clickTrackingParams?: string;
  openPopupAction?: StickyOpenPopupAction;
};

type StickyOpenPopupAction = {
  popup?: IndecentPopup;
  popupType?: string;
  beReused?: boolean;
};

type IndecentPopup = {
  multiPageMenuRenderer?: MultiPageMenuRenderer;
};

type MultiPageMenuRenderer = {
  trackingParams?: string;
  style?: string;
  showLoadingSpinner?: boolean;
};

export type YoutubePlayerInitialResponse = {
  responseContext?: ResponseContext;
  playabilityStatus?: PlayabilityStatus;
  streamingData?: StreamingData;
  heartbeatParams?: HeartbeatParams;
  playbackTracking?: PlaybackTracking;
  captions?: Captions;
  videoDetails?: VideoDetails;
  playerConfig?: PlayerConfig;
  storyboards?: Storyboards;
  microformat?: Microformat;
  cards?: Cards;
  trackingParams?: string;
  adBreakHeartbeatParams?: string;
  frameworkUpdates?: FrameworkUpdates;
};

type Captions = {
  playerCaptionsTracklistRenderer?: PlayerCaptionsTracklistRenderer;
};

type PlayerCaptionsTracklistRenderer = {
  captionTracks?: CaptionTrack[];
  audioTracks?: AudioTrack[];
  translationLanguages?: TranslationLanguage[];
  defaultAudioTrackIndex?: number;
};

type AudioTrack = {
  captionTrackIndices?: number[];
};

type CaptionTrack = {
  baseUrl?: string;
  name?: HeaderText;
  vssId?: string;
  languageCode?: string;
  kind?: string;
  isTranslatable?: boolean;
  trackName?: string;
};

type HeaderText = {
  simpleText?: string;
};

type TranslationLanguage = {
  languageCode?: string;
  languageName?: HeaderText;
};

type Cards = {
  cardCollectionRenderer?: CardCollectionRenderer;
};

type CardCollectionRenderer = {
  cards?: Card[];
  headerText?: HeaderText;
  icon?: CloseButton;
  closeButton?: CloseButton;
  trackingParams?: string;
  allowTeaserDismiss?: boolean;
  logIconVisibilityUpdates?: boolean;
};

type Card = {
  cardRenderer?: CardRenderer;
};

type CardRenderer = {
  teaser?: Teaser;
  cueRanges?: CueRange[];
  trackingParams?: string;
};

type CueRange = {
  startCardActiveMs?: string;
  endCardActiveMs?: string;
  teaserDurationMs?: string;
  iconAfterTeaserMs?: string;
};

type Teaser = {
  simpleCardTeaserRenderer?: SimpleCardTeaserRenderer;
};

type SimpleCardTeaserRenderer = {
  message?: HeaderText;
  trackingParams?: string;
  prominent?: boolean;
  logVisibilityUpdates?: boolean;
  onTapCommand?: OnTapCommand;
};

type OnTapCommand = {
  clickTrackingParams?: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
};

type CloseButton = {
  infoCardIconRenderer?: InfoCardIconRenderer;
};

type InfoCardIconRenderer = {
  trackingParams?: string;
};

type FrameworkUpdates = {
  entityBatchUpdate?: EntityBatchUpdate | FrameworkUpdatesEntityBatchUpdate;
};

type EntityBatchUpdate = {
  mutations?: unknown[];
  timestamp?: Timestamp;
};

type HeartbeatParams = {
  heartbeatToken?: string;
  intervalMilliseconds?: string;
  maxRetries?: string;
  drmSessionId?: string;
  softFailOnError?: boolean;
  heartbeatServerData?: string;
};

type PlayerMicroformatRenderer = {
  thumbnail?: PlayerMicroformatRendererThumbnail;
  embed?: Embed;
  title?: HeaderText;
  description?: HeaderText;
  lengthSeconds?: string;
  ownerProfileUrl?: string;
  externalChannelId?: string;
  isFamilySafe?: boolean;
  availableCountries?: string[];
  isUnlisted?: boolean;
  hasYpcMetadata?: boolean;
  viewCount?: string;
  category?: string;
  publishDate?: Date;
  ownerChannelName?: string;
  uploadDate?: Date;
  isShortsEligible?: boolean;
  externalVideoId?: string;
  likeCount?: string;
  canonicalUrl?: string;
};

type Embed = {
  iframeUrl?: string;
  width?: number;
  height?: number;
};

type PlayerMicroformatRendererThumbnail = {
  thumbnails?: ThumbnailElement[];
};

export type ThumbnailElement = {
  url?: string;
  width?: number;
  height?: number;
};

type PlayabilityStatus = {
  status?: string;
  playableInEmbed?: boolean;
  offlineability?: Offlineability;
  miniplayer?: Miniplayer;
  contextParams?: string;
};

type Miniplayer = {
  miniplayerRenderer?: MiniplayerRenderer;
};

type MiniplayerRenderer = {
  playbackMode?: string;
};

type Offlineability = {
  offlineabilityRenderer?: OfflineabilityRenderer;
};

type OfflineabilityRenderer = {
  offlineable?: boolean;
  formats?: OfflineabilityRendererFormat[];
  clickTrackingParams?: string;
};

type OfflineabilityRendererFormat = {
  name?: Name;
  formatType?: string;
  availabilityType?: string;
  savedSettingShouldExpire?: boolean;
};

type Name = {
  runs?: Run[];
};

type Run = {
  text?: string;
};

type PlaybackTracking = {
  videostatsPlaybackUrl?: URL;
  videostatsDelayplayUrl?: URL;
  videostatsWatchtimeUrl?: URL;
  ptrackingUrl?: URL;
  qoeUrl?: URL;
  atrUrl?: AtrURL;
  videostatsScheduledFlushWalltimeSeconds?: number[];
  videostatsDefaultFlushIntervalSeconds?: number;
};

type AtrURL = {
  baseUrl?: string;
  elapsedMediaTimeSeconds?: number;
};

type URL = {
  baseUrl?: string;
};

type PlayerConfig = {
  granularVariableSpeedConfig?: GranularVariableSpeedConfig;
  vssClientConfig?: VssClientConfig;
  audioConfig?: AudioConfig;
  streamSelectionConfig?: StreamSelectionConfig;
  playerControlsConfig?: PlayerControlsConfig;
  daiConfig?: DaiConfig;
  mediaCommonConfig?: MediaCommonConfig;
  webPlayerConfig?: WebPlayerConfig;
};

type AudioConfig = {
  loudnessDb?: number;
  perceptualLoudnessDb?: number;
  enablePerFormatLoudness?: boolean;
  trackAbsoluteLoudnessLkfs?: number;
  loudnessTargetLkfs?: number;
  loudnessNormalizationConfig?: LoudnessNormalizationConfig;
};

type LoudnessNormalizationConfig = {
  applyStatefulNormalization?: boolean;
  preserveStatefulLoudnessTarget?: boolean;
  maxStatefulTimeThresholdSec?: number;
  minimumLoudnessTargetLkfs?: number;
};

type DaiConfig = {
  sendSsdaiMissingAdBreakReasons?: boolean;
};

type GranularVariableSpeedConfig = {
  minimumPlaybackRate?: number;
  maximumPlaybackRate?: number;
  stepSize?: number;
  defaultPlaybackRateOptions?: DefaultPlaybackRateOption[];
};

type DefaultPlaybackRateOption = {
  label?: string;
  value?: number;
  isPremiumUpsell?: boolean;
  priority?: number;
};

type MediaCommonConfig = {
  dynamicReadaheadConfig?: DynamicReadaheadConfig;
  mediaUstreamerRequestConfig?: MediaUstreamerRequestConfig;
  useServerDrivenAbr?: boolean;
  serverPlaybackStartConfig?: ServerPlaybackStartConfig;
  platypusUseEnvoyNetFetch?: boolean;
  fixLivePlaybackModelDefaultPosition?: boolean;
};

type DynamicReadaheadConfig = {
  maxReadAheadMediaTimeMs?: number;
  minReadAheadMediaTimeMs?: number;
  readAheadGrowthRateMs?: number;
};

type MediaUstreamerRequestConfig = {
  videoPlaybackUstreamerConfig?: string;
};

type ServerPlaybackStartConfig = {
  enable?: boolean;
  playbackStartPolicy?: PlaybackStartPolicy;
};

type PlaybackStartPolicy = {
  startMinReadaheadPolicy?: StartMinReadaheadPolicy[];
};

type StartMinReadaheadPolicy = {
  minReadaheadMs?: number;
};

type PlayerControlsConfig = {
  showCachedInTimebar?: boolean;
};

type StreamSelectionConfig = {
  maxBitrate?: string;
};

type VssClientConfig = {
  vssUsePostRequest?: boolean;
};

type WebPlayerConfig = {
  useCobaltTvosDash?: boolean;
  webPlayerActionsPorting?: WebPlayerActionsPorting;
};

type WebPlayerActionsPorting = {
  getSharePanelCommand?: GetSharePanelCommand;
  subscribeCommand?: SubscribeCommand;
  unsubscribeCommand?: UnsubscribeCommand;
  addToWatchLaterCommand?: AddToWatchLaterCommand;
  removeFromWatchLaterCommand?: RemoveFromWatchLaterCommand;
};

type AddToWatchLaterCommand = {
  clickTrackingParams?: string;
  commandMetadata?: CommandMetadata;
  playlistEditEndpoint?: AddToWatchLaterCommandPlaylistEditEndpoint;
};

type CommandMetadata = {
  webCommandMetadata?: WebCommandMetadata;
};

type WebCommandMetadata = {
  sendPost?: boolean;
  apiUrl?: string;
};

type AddToWatchLaterCommandPlaylistEditEndpoint = {
  playlistId?: string;
  actions?: PurpleAction[];
};

type PurpleAction = {
  addedVideoId?: string;
  action?: string;
};

type GetSharePanelCommand = {
  clickTrackingParams?: string;
  commandMetadata?: CommandMetadata;
  webPlayerShareEntityServiceEndpoint?: WebPlayerShareEntityServiceEndpoint;
};

type WebPlayerShareEntityServiceEndpoint = {
  serializedShareEntity?: string;
};

type RemoveFromWatchLaterCommand = {
  clickTrackingParams?: string;
  commandMetadata?: CommandMetadata;
  playlistEditEndpoint?: RemoveFromWatchLaterCommandPlaylistEditEndpoint;
};

type RemoveFromWatchLaterCommandPlaylistEditEndpoint = {
  playlistId?: string;
  actions?: FluffyAction[];
};

type FluffyAction = {
  action?: string;
  removedVideoId?: string;
};

type SubscribeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: CommandMetadata;
  subscribeEndpoint?: SubscribeEndpoint;
};

type SubscribeEndpoint = {
  channelIds?: string[];
  params?: string;
};

type UnsubscribeCommand = {
  clickTrackingParams?: string;
  commandMetadata?: CommandMetadata;
  unsubscribeEndpoint?: SubscribeEndpoint;
};

type ResponseContext = {
  serviceTrackingParams?: ServiceTrackingParam[];
  maxAgeSeconds?: number;
  mainAppWebResponseContext?: MainAppWebResponseContext;
  responseId?: string;
  webResponseContextExtensionData?: WebResponseContextExtensionData;
};

type MainAppWebResponseContext = {
  datasyncId?: string;
  loggedOut?: boolean;
  trackingParam?: string;
};

type ServiceTrackingParam = {
  service?: string;
  params?: Param[];
};

type WebResponseContextPreloadData = {
  preloadMessageNames?: string[];
};

type Storyboards = {
  playerStoryboardSpecRenderer?: PlayerStoryboardSpecRenderer;
};

type PlayerStoryboardSpecRenderer = {
  spec?: string;
  recommendedLevel?: number;
  fineScrubbingRecommendedLevel?: number;
  highResolutionRecommendedLevel?: number;
};

type StreamingData = {
  expiresInSeconds?: string;
  formats?: StreamingDataFormat[];
  adaptiveFormats?: AdaptiveFormat[];
  serverAbrStreamingUrl?: string;
};

type AdaptiveFormat = {
  itag?: number;
  mimeType?: string;
  bitrate?: number;
  width?: number;
  height?: number;
  initRange?: Range;
  indexRange?: Range;
  lastModified?: string;
  contentLength?: string;
  quality?: string;
  fps?: number;
  qualityLabel?: string;
  projectionType?: ProjectionType;
  averageBitrate?: number;
  approxDurationMs?: string;
  qualityOrdinal?: string;
  colorInfo?: ColorInfo;
  highReplication?: boolean;
  audioQuality?: AudioQuality;
  audioSampleRate?: string;
  audioChannels?: number;
  loudnessDb?: number;
  trackAbsoluteLoudnessLkfs?: number;
  xtags?: string;
  isDrc?: boolean;
  isVb?: boolean;
};

type AudioQuality = "AUDIO_QUALITY_MEDIUM" | "AUDIO_QUALITY_LOW";

type ColorInfo = {
  primaries?: Primaries;
  transferCharacteristics?: TransferCharacteristics;
  matrixCoefficients?: MatrixCoefficients;
};

type MatrixCoefficients = "COLOR_MATRIX_COEFFICIENTS_BT709";

type Primaries = "COLOR_PRIMARIES_BT709";

type TransferCharacteristics = "COLOR_TRANSFER_CHARACTERISTICS_BT709";

type Range = {
  start?: string;
  end?: string;
};

type ProjectionType = "RECTANGULAR";

type StreamingDataFormat = {
  itag?: number;
  mimeType?: string;
  bitrate?: number;
  width?: number;
  height?: number;
  lastModified?: string;
  contentLength?: string;
  quality?: string;
  fps?: number;
  qualityLabel?: string;
  projectionType?: ProjectionType;
  averageBitrate?: number;
  audioQuality?: AudioQuality;
  approxDurationMs?: string;
  audioSampleRate?: string;
  audioChannels?: number;
  signatureCipher?: string;
  qualityOrdinal?: string;
};

type VideoDetails = {
  videoId?: string;
  title?: string;
  lengthSeconds?: string;
  keywords?: string[];
  channelId?: string;
  isOwnerViewing?: boolean;
  shortDescription?: string;
  isCrawlable?: boolean;
  thumbnail?: PlayerMicroformatRendererThumbnail;
  allowRatings?: boolean;
  viewCount?: string;
  author?: string;
  isPrivate?: boolean;
  isUnpluggedCorpus?: boolean;
  isLiveContent?: boolean;
  isTvfilmVideo?: boolean;
};
