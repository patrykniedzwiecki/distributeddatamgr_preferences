/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {beforeAll, beforeEach, describe, afterEach, afterAll, expect, it} from '@ohos/hypium';
import dataPreferences from '@ohos.data.preferences'
import featureAbility from '@ohos.ability.featureAbility';

const NAME = 'test_preferences';
const BASE_COUNT = 2000;
const BASELINE = 25000;

var context;

const TAG = '[SUB_DDM_PERF_PreferencesInstanceSyncJsPref]'

describe("PreferencesInstanceSyncJsPref", async function () {
    beforeAll(async function () {
        console.info(`${TAG}beforeAll`)
        context = featureAbility.getContext()
    })

    beforeEach(async function () {
        console.info(`${TAG}beforeEach`);
    })

    afterEach(async function () {
        console.info(`${TAG}afterEach`);
    })

    afterAll(async function () {
        console.info(`${TAG}afterAll`)
    })

    /**
     * @tc.desc PreferencesInstanceSyncJsPref_RemovePreferencesFromCacheSync with repeating one pref
     */
    it("removePreferencesFromCacheSync_0001", 0, async function () {
        let startTime = new Date().getTime(); // time unit is mm
        for (let index = 0; index < BASE_COUNT; index++) {
            await dataPreferences.removePreferencesFromCacheSync(context, NAME);
        }
        let endTime = new Date().getTime();
        let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.info(`${TAG}removePreferencesFromCacheSync_0001 averageTime: ${averageTime} us`);
        expect(averageTime < BASELINE).assertTrue();
    })

    /**
     * @tc.desc PreferencesInstanceSyncJsPref_RemovePreferencesFromCacheSync with diff pref
     */
    it("removePreferencesFromCacheSync_0002", 0, async function () {
        for (let index = 0; index < BASE_COUNT; index++) {
            await dataPreferences.getPreferences(context, `${NAME}${index}`); // put prefs into cache
        }
        let startTime = new Date().getTime(); // time unit is mm
        for (let index = 0; index < BASE_COUNT; index++) {
            await dataPreferences.removePreferencesFromCacheSync(context, `${NAME}${index}`);
        }
        let endTime = new Date().getTime();
        let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
        console.info(`${TAG}removePreferencesFromCacheSync_0002 averageTime: ${averageTime} us`);
        expect(averageTime < BASELINE).assertTrue();
    })
})