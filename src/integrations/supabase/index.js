import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### customers

| name       | type        | format | required |
|------------|-------------|--------|----------|
| customer_id| uuid        | string | true     |
| first_name | text        | string | false    |
| last_name  | text        | string | false    |
| phone_number| text       | string | false    |
| email      | text        | string | false    |
| address    | text        | string | false    |
| created_at | timestamptz | string | true     |
| updated_at | timestamptz | string | true     |

### advisors

| name       | type        | format | required |
|------------|-------------|--------|----------|
| advisor_id | int4        | number | true     |
| advisor_name| text       | string | true     |

### estimates

| name       | type        | format | required |
|------------|-------------|--------|----------|
| estimate_id| int4        | number | true     |
| estimate_number| varchar | string | false    |
| first_name | varchar     | string | false    |
| last_name  | varchar     | string | false    |
| phone_number| varchar    | string | false    |
| unit_description| text   | string | false    |
| vin        | varchar     | string | false    |
| advisor    | varchar     | string | false    |
| payment_type| varchar    | string | false    |
| deductible | varchar     | string | false    |
| estimate_date| date      | string | false    |
| roof_kit   | numeric     | number | false    |
| roof_membrane| numeric   | number | false    |
| slf_lvl_dicor| numeric   | number | false    |
| non_lvl_dicor| numeric   | number | false    |
| roof_screws| numeric     | number | false    |
| glue       | numeric     | number | false    |
| additional_parts| numeric| number | false    |
| repair_description| text | string | false    |
| notes      | text        | string | false    |
| hrs        | numeric     | number | false    |
| labor_per_hr| numeric    | number | false    |
| sublet     | numeric     | number | false    |
| extras     | numeric     | number | false    |
| labor      | numeric     | number | false    |
| shop_supplies| numeric   | number | false    |
| tax        | numeric     | number | false    |
| total_estimate| numeric  | number | false    |
| created_at | timestamp   | string | true     |
| updated_at | timestamp   | string | true     |
| job_code   | text        | string | false    |
| parts_configuration| jsonb| string| false    |
| labor_configuration| jsonb| string| false    |
| customer_id| uuid        | string | false    |
| advisor_id | int4        | number | false    |

### pre_configured_jobs

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| job_code   | text        | string | true     |
| job_name   | text        | string | true     |
| job_description| text    | string | false    |
| roof_kit   | numeric     | number | false    |
| roof_membrane| numeric   | number | false    |
| slf_lvl_dicor| numeric   | number | false    |
| non_lvl_dicor| numeric   | number | false    |
| roof_screws| numeric     | number | false    |
| glue       | numeric     | number | false    |
| additional_parts| numeric| number | false    |
| repair_description| text | string | false    |
| hrs        | numeric     | number | false    |
| labor_per_hr| numeric    | number | false    |
| job_price  | numeric     | number | false    |

*/

// Hooks for customers
export const useCustomers = () => useQuery({
    queryKey: ['customers'],
    queryFn: () => fromSupabase(supabase.from('customers').select('*')),
});
export const useCustomer = (customer_id) => useQuery({
    queryKey: ['customers', customer_id],
    queryFn: () => fromSupabase(supabase.from('customers').select('*').eq('customer_id', customer_id).single()),
});
export const useAddCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCustomer) => fromSupabase(supabase.from('customers').insert([newCustomer])),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};
export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedCustomer) => fromSupabase(supabase.from('customers').update(updatedCustomer).eq('customer_id', updatedCustomer.customer_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};
export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (customer_id) => fromSupabase(supabase.from('customers').delete().eq('customer_id', customer_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

// Hooks for advisors
export const useAdvisors = () => useQuery({
    queryKey: ['advisors'],
    queryFn: () => fromSupabase(supabase.from('advisors').select('*')),
});
export const useAdvisor = (advisor_id) => useQuery({
    queryKey: ['advisors', advisor_id],
    queryFn: () => fromSupabase(supabase.from('advisors').select('*').eq('advisor_id', advisor_id).single()),
});
export const useAddAdvisor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAdvisor) => fromSupabase(supabase.from('advisors').insert([newAdvisor])),
        onSuccess: () => {
            queryClient.invalidateQueries('advisors');
        },
    });
};
export const useUpdateAdvisor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedAdvisor) => fromSupabase(supabase.from('advisors').update(updatedAdvisor).eq('advisor_id', updatedAdvisor.advisor_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('advisors');
        },
    });
};
export const useDeleteAdvisor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (advisor_id) => fromSupabase(supabase.from('advisors').delete().eq('advisor_id', advisor_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('advisors');
        },
    });
};

// Hooks for estimates
export const useEstimates = () => useQuery({
    queryKey: ['estimates'],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*')),
});
export const useEstimate = (estimate_id) => useQuery({
    queryKey: ['estimates', estimate_id],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*').eq('estimate_id', estimate_id).single()),
});
export const useAddEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEstimate) => fromSupabase(supabase.from('estimates').insert([newEstimate])),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};
export const useUpdateEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEstimate) => fromSupabase(supabase.from('estimates').update(updatedEstimate).eq('estimate_id', updatedEstimate.estimate_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};
export const useDeleteEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (estimate_id) => fromSupabase(supabase.from('estimates').delete().eq('estimate_id', estimate_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

// Hooks for pre_configured_jobs
export const usePreConfiguredJobs = () => useQuery({
    queryKey: ['pre_configured_jobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*')),
});
export const usePreConfiguredJob = (id) => useQuery({
    queryKey: ['pre_configured_jobs', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*').eq('id', id).single()),
});
export const useAddPreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('pre_configured_jobs');
        },
    });
};
export const useUpdatePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedJob) => fromSupabase(supabase.from('pre_configured_jobs').update(updatedJob).eq('id', updatedJob.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('pre_configured_jobs');
        },
    });
};
export const useDeletePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('pre_configured_jobs');
        },
    });
};