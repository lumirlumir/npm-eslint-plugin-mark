<!-- markdownlint-disable MD033 -->

# Rules

All rules from `eslint-plugin-mark`.

<!-- Auto-generated rule list start -->

<script setup>
import { data } from './index.data.js';
const { ruleMetas } = data;
</script>

| Emoji                    | Description                                                                                                                                             |
| :----------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| {{ $emoji.recommended }} | Using `recommended` config from `eslint-plugin-mark` in a config file enables this rule.                                                                |
| {{ $emoji.fixable }}     | Some problems reported by this rule are automatically fixable by `--fix` [CLI](https://eslint.org/docs/latest/use/command-line-interface#--fix) option. |
| {{ $emoji.suggestion }}  | Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).    |
| {{ $emoji.commonmark }}  | Rule is applicable to [CommonMark](https://commonmark.org/).                                                                                            |
| {{ $emoji.gfm }}         | Rule is applicable to [GitHub Flavored Markdown](https://github.github.com/gfm/).                                                                       |

---

<div>
  <table>
    <thead>
      <tr>
        <th style="width: 11rem">Rules ({{ ruleMetas.length }})</th>
        <th>Description</th>
        <th class="narrow">{{ $emoji.recommended }}</th>
        <th class="narrow">{{ $emoji.fixable }}</th>
        <th class="narrow">{{ $emoji.suggestion }}</th>
        <th class="narrow">{{ $emoji.commonmark }}</th>
        <th class="narrow">{{ $emoji.gfm }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ruleMeta in ruleMetas" :key="ruleMeta.name">
        <td><a :href="ruleMeta.name"><code>{{ ruleMeta.name }}</code></a></td>
        <td>
          <!-- Backticks handling -->
          <template v-for="(part, index) in ruleMeta.description.split(/(`[^`]+`)/)">
            <code v-if="part.startsWith('`') && part.endsWith('`')">
              {{ part.slice(1, -1) }}
            </code>
            <template v-else>{{ part }}</template>
          </template>
        </td>
        <td class="narrow">{{ ruleMeta.recommended ? $emoji.recommended : '' }}</td>
        <td class="narrow">{{ ruleMeta.fixable ? $emoji.fixable : '' }}</td>
        <td class="narrow">{{ ruleMeta.suggestion ? $emoji.suggestion : '' }}</td>
        <td class="narrow">{{ ruleMeta.commonmark ? $emoji.commonmark : '' }}</td>
        <td class="narrow">{{ ruleMeta.gfm ? $emoji.gfm : '' }}</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Auto-generated rule list end -->
