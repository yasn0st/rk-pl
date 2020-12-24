<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="!hideStatus"
    class="Status"
    :class="[{ '-focused': isFocused }, { '-conversation': inlineExpanded }]"
  >
    <div
      v-if="error"
      class="alert error"
    >
      {{ error }}
      <span
        class="fa-scale-110 fa-old-padding"
        @click="clearError"
      >
        <FAIcon icon="times" />
      </span>
    </div>
    <template v-if="muted && !isPreview">
      <div class="status-container muted">
        <small class="status-username">
          <FAIcon
            v-if="muted && retweet"
            class="fa-scale-110 fa-old-padding repeat-icon"
            icon="retweet"
          />
          <router-link :to="userProfileLink">
            {{ status.user.screen_name }}
          </router-link>
        </small>
        <small
          v-if="showReasonMutedThread"
          class="mute-thread"
        >
          {{ $t('status.thread_muted') }}
        </small>
        <small
          v-if="showReasonMutedThread && muteWordHits.length > 0"
          class="mute-thread"
        >
          {{ $t('status.thread_muted_and_words') }}
        </small>
        <small
          class="mute-words"
          :title="muteWordHits.join(', ')"
        >
          {{ muteWordHits.join(', ') }}
        </small>
        <button
          class="unmute button-unstyled"
          @click.prevent="toggleMute"
        >
          <FAIcon
            icon="eye-slash"
            class="fa-scale-110 fa-old-padding"
          />
        </button>
      </div>
    </template>
    <template v-else>
      <div
        v-if="showPinned"
        class="pin"
      >
        <FAIcon
          icon="thumbtack"
          class="faint"
        />
        <span class="faint">{{ $t('status.pinned') }}</span>
      </div>
      <div
        v-if="retweet && !noHeading && !inConversation"
        :class="[repeaterClass, { highlighted: repeaterStyle }]"
        :style="[repeaterStyle]"
        class="status-container repeat-info"
      >
        <UserAvatar
          v-if="retweet"
          class="left-side repeater-avatar"
          :better-shadow="betterShadow"
          :user="statusoid.user"
        />
        <div class="right-side faint">
          <span
            class="status-username repeater-name"
            :title="retweeter"
          >
            <router-link
              v-if="retweeterHtml"
              :to="retweeterProfileLink"
              v-html="retweeterHtml"
            />
            <router-link
              v-else
              :to="retweeterProfileLink"
            >{{ retweeter }}</router-link>
          </span>
          <FAIcon
            icon="retweet"
            class="repeat-icon"
            :title="$t('tool_tip.repeat')"
          />
          {{ $t('timeline.repeated') }}
        </div>
      </div>

      <div
        v-if="!deleted"
        :class="[userClass, { highlighted: userStyle, '-repeat': retweet && !inConversation }]"
        :style="[ userStyle ]"
        class="status-container"
        :data-tags="tags"
      >
        <div class="right-side">
          <PrdataContent
            :status="status"
            :no-heading="noHeading"
            :highlight="highlight"
            :focused="isFocused"
            @mediaplay="addMediaPlaying($event)"
            @mediapause="removeMediaPlaying($event)"
          />

          <transition name="fade">
            <div
              v-if="!hidePostStats && isFocused && combinedFavsAndRepeatsUsers.length > 0"
              class="favs-repeated-users"
            >
              <div class="stats">
                <UserListPopover
                  v-if="statusFromGlobalRepository.rebloggedBy && statusFromGlobalRepository.rebloggedBy.length > 0"
                  :users="statusFromGlobalRepository.rebloggedBy"
                >
                  <div class="stat-count">
                    <a class="stat-title">{{ $t('status.repeats') }}</a>
                    <div class="stat-number">
                      {{ statusFromGlobalRepository.rebloggedBy.length }}
                    </div>
                  </div>
                </UserListPopover>
                <UserListPopover
                  v-if="statusFromGlobalRepository.favoritedBy && statusFromGlobalRepository.favoritedBy.length > 0"
                  :users="statusFromGlobalRepository.favoritedBy"
                >
                  <div
                    class="stat-count"
                  >
                    <a class="stat-title">{{ $t('status.favorites') }}</a>
                    <div class="stat-number">
                      {{ statusFromGlobalRepository.favoritedBy.length }}
                    </div>
                  </div>
                </UserListPopover>
                <div class="avatar-row">
                  <AvatarList :users="combinedFavsAndRepeatsUsers" />
                </div>
              </div>
            </div>
          </transition>

          <div
            v-if="!noHeading && !isPreview"
            class="status-actions"
          />
        </div>
      </div>
      <div
        v-else
        class="gravestone"
      >
        <div class="left-side">
          <UserAvatar :compact="compact" />
        </div>
        <div class="right-side">
          <div class="deleted-text">
            {{ $t('status.status_deleted') }}
          </div>
          <reply-button
            v-if="replying"
            :replying="replying"
            :status="status"
            @toggle="toggleReplying"
          />
        </div>
      </div>
      <div
        v-if="replying"
        class="status-container reply-form"
      >
        <PostStatusForm
          class="reply-body"
          :reply-to="status.id"
          :attentions="status.attentions"
          :replied-user="status.user"
          :copy-message-scope="status.visibility"
          :subject="replySubject"
          @posted="toggleReplying"
        />
      </div>
    </template>
  </div>
<!-- eslint-enable vue/no-v-html -->
</template>

<script src="./prdata.js" ></script>

<style src="./prdata.scss" lang="scss"></style>
