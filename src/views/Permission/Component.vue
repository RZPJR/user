<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="3">
                    <SelectVendorBadge
                        :dataUnq="'filter-vendorBadge'"
                        :label="'Filter Vendor Badge'"
                        :vendor_badge="{id:4}"
                        :norequired="true"
                        :dense="true"
                        :disabled="false"
                    ></SelectVendorBadge>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectVendorCommodity
                        :dataUnq="'filter-vendorCommodity'"
                        :label="'Filter Vendor Commodity'"
                        :vendor_commodity="{id:5}"
                        :norequired="true"
                        :dense="true"
                        :disabled="false"
                    ></SelectVendorCommodity>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectVendorOrganization
                        :dataUnq="'filter-vendorOrganization'"
                        :label="'Filter Vendor Organization'"
                        :vendor_organization="{id:6}"
                        :norequired="true"
                        :dense="true"
                        :disabled="false"
                    ></SelectVendorOrganization>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectVendorRelation
                        :dataUnq="'filter-vendorRelation'"
                        :label="'Filter Vendor Relation'"
                        :vendor_relation="{id:7}"
                        :norequired="true"
                        :dense="true"
                        :disabled="false"
                    ></SelectVendorRelation>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectVendorType
                        :dataUnq="'filter-vendorType'"
                        :label="'Filter Vendor Type'"
                        :vendor_type="{id:8}"
                        :norequired="true"
                        :dense="true"
                        :disabled="false"
                    ></SelectVendorType>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectVendor
                        :label="'Filter Vendor'"
                        :vendor="{id:4}"
                        :norequired="true"
                        :dense="true"
                        :disabled="false"
                    ></SelectVendor>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectRole
                        :role="{id:3}"
                        :norequired="true"
                        :dense="true"
                    ></SelectRole>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: "Permission",
        data() {
            return {
                showFilter : false,
            }
        },
        created(){
        },
        computed: {
        },
        methods: {
        },
        watch: {
        },
    }
</script>