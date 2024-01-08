import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
	CREATE OR REPLACE FUNCTION get_farmer_statistics(_farmer_id UUID)
	RETURNS TABLE (
		total_farms_count INT,
		total_area_sum INT,
		state_percentage JSONB,
		crop_percentage JSONB,
		vegetation_area_percentage DECIMAL,
		arable_area_percentage DECIMAL
	) AS $$
	DECLARE
		total_farms_count INT;
		total_area_sum INT;
		arable_area_sum INT;
		state_percentage JSONB;
		crop_percentage JSONB;
		total_area_percentage DECIMAL;
		vegetation_area_percentage DECIMAL;
		arable_area_percentage DECIMAL;
	BEGIN

		SELECT COUNT(*) INTO total_farms_count
		FROM farm
		WHERE farm.farmer_id = _farmer_id;


		SELECT COALESCE(SUM(total_area), 0) INTO total_area_sum
		FROM farm
		WHERE farm.farmer_id = _farmer_id;

		SELECT COALESCE(SUM(arable_area), 0) INTO arable_area_sum
		FROM farm
		WHERE farm.farmer_id = _farmer_id;

		SELECT jsonb_object_agg(crop_type, sumarea::DECIMAL/arable_area_sum) INTO crop_percentage
		FROM (
			select sum(area) as sumarea, crop_type
			from crop
			where farm_id IN (SELECT id from farm where farmer_id = _farmer_id)
			group by crop_type
		) AS crop_count;

		SELECT jsonb_object_agg(state, state_count::DECIMAL / total_farms_count) INTO state_percentage
		FROM (
			SELECT state, COUNT(*) AS state_count
			FROM farm
			WHERE farm.farmer_id = _farmer_id
			GROUP BY state
		) AS state_counts;



		SELECT (total_area_sum::DECIMAL / COALESCE(SUM(total_area), 1)) * 100 INTO total_area_percentage
		FROM farm
		WHERE farm.farmer_id = _farmer_id;

		SELECT (SUM(arable_area)::DECIMAL / total_area_sum)  INTO arable_area_percentage
		FROM farm
		WHERE farm.farmer_id = _farmer_id;

		SELECT (SUM(vegetation_area)::DECIMAL / total_area_sum)  INTO vegetation_area_percentage
		FROM farm
		WHERE farm.farmer_id = _farmer_id;

		RETURN QUERY SELECT total_farms_count, total_area_sum, state_percentage, crop_percentage, arable_area_percentage,vegetation_area_percentage;
	END;
	$$ LANGUAGE plpgsql;


	`)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP FUNCTION IF EXISTS get_farmer_statistics(_farmer_id  UUID);`)
}
